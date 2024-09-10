"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sendPasswordResetEmail, sendVerificationEmail } from "~/lib/email";
import {
  genResetPasswordToken,
  genVerifiationToken,
  getPasswordResetTokenByToken,
} from "~/lib/tokens";
import { type LoginActions } from "~/lib/types";
import {
  forgotPasswordSchema,
  goolgeNameSchema,
  type IForgotPassword,
  type IGoogleName,
  type ILogin,
  type IPasswordReset,
  type IRegister,
  loginSchema,
  passwordResetSchema,
  registerSchema,
} from "~/lib/validation";
import { lucia, validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
  error?: string;
  success?: string;
  action?: LoginActions;
}

export const login = async (values: ILogin): Promise<ActionResult> => {
  "use server";
  const fields = loginSchema.safeParse(values);

  if (!fields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = fields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return {
      error: `Invalid email or password`,
    };
  }

  // Is OAuth
  if (existingUser.password === null) {
    return {
      error: "Invalid email or password",
    };
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);

  if (!validPassword) {
    return {
      error: "Invalid email or password",
    };
  }

  // if (!existingUser.emailVerified) {
  //     return {
  //         error: "Please verify your email",
  //         action: "EMAIL_NOT_VERIFIED"
  //     };
  // }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return {
    success: "Logged in",
  };
};

export const register = async (values: IRegister): Promise<ActionResult> => {
  "use server";
  const fields = registerSchema.safeParse(values);

  if (!fields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password, username: name } = fields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const userExists = await db.user.findFirst({
    where: {
      OR: [{ email }, { name }],
    },
  });

  if (userExists) {
    if (userExists.email === email) {
      return {
        error: "Email already exists",
      };
    }

    if (userExists.name === name) {
      return {
        error: "Username already exists",
      };
    }
  }

  const newUser = await db.user.create({
    data: {
      name,
      password: hashedPassword,
      email,
      image: `https://api.dicebear.com/9.x/shapes/svg?seed=${name}`
    },
  });

  if (!newUser) {
    return {
      error: "Something went wrong when creating user",
    };
  }

  const verificationToken = await genVerifiationToken(email);

  await sendVerificationEmail(email, verificationToken, name);

  // TODO: Run this code on verification, not on sign up
  // ...................................................
  const session = await lucia.createSession(newUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return {
    success: "Check your email!",
  };
};

export const resendVerificationEmail = async (
  email: string,
): Promise<ActionResult> => {
  "use server";
  console.log(email);
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      error: "Invalid email",
    };
  }

  if (user.emailVerified) {
    return {
      error: "Email already verified",
    };
  }

  if (!user.name) {
    return {
      error: "Username not set",
    };
  }

  const verificationToken = await genVerifiationToken(email);

  await sendVerificationEmail(email, verificationToken, user.name);

  return {
    success: "Check your email!",
  };
};

export const updateUsername = async (
  id: string,
  values: IGoogleName,
): Promise<ActionResult> => {
  "use server";
  const fields = goolgeNameSchema.safeParse(values);

  if (!fields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { username } = fields.data;

  const existingUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    return {
      error: "User not found",
    };
  }

  if (existingUser.name) {
    return {
      error: "Username already set",
    };
  }

  const existsUsername = await db.user.findUnique({
    where: {
      name: username,
    },
  });

  if (existsUsername) {
    return {
      error: "Username already exists",
    };
  }

  await db.user.update({
    where: {
      id,
    },
    data: {
      name: username,
    },
  });

  return {
    success: "Username successfully set!",
  };
};

export const signout = async (): Promise<ActionResult> => {
  "use server";
  const { session } = await validateRequest();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/auth/login");
};

export const verifyUser = async (token: string): Promise<ActionResult> => {
  const existingToken = await db.verificationToken.findUnique({
    where: {
      token,
    },
  });

  if (!existingToken) {
    return {
      error: "Invalid link",
    };
  }

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return {
      error: "Link expired",
    };
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: existingToken.email,
    },
  });

  if (!existingUser) {
    return {
      error: "Email does not exist",
    };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  // Run this code on verification, not on sign up
  // ...................................................
  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return {
    success: "Email verified!",
  };
};

export const forgotPassword = async (values: IForgotPassword) => {
  "use server";

  const fields = forgotPasswordSchema.safeParse(values);

  if (!fields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email } = fields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return {
      error: "Invalid email",
    };
  }

  if (!existingUser.name) {
    return {
      error: "Invalid email (2)",
    };
  }

  const token = await genResetPasswordToken(email);

  await sendPasswordResetEmail(email, token, existingUser.name);

  return {
    success: "Check your email!",
  };
};

export const resetPassword = async (
  token: string | null,
  values: IPasswordReset,
): Promise<ActionResult> => {
  if (!token) {
    return { error: "Invalid link (missing token)!" };
  }

  const fields = passwordResetSchema.safeParse(values);

  if (!fields.success) {
    return { error: "Invalid fields" };
  }

  const { confirmPassword, newPassword } = fields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return { error: "Invalid link!" };

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return { error: "Link expired!" };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match!" };
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: existingToken.email,
    },
  });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser?.password) {
    return {
      error: "Invalid email! (This email is connected to an OAuth provider)",
    };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: await bcrypt.hash(newPassword, 10),
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password has been reset!" };
};
