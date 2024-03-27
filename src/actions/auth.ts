"use server";

import { type ILogin, loginSchema, type IRegister, registerSchema, type IGoogleName, goolgeNameSchema } from "~/lib/validation";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "~/server/auth";

export const login = async (values: ILogin): Promise<ActionResult> => {
    "use server";
    const fields = loginSchema.safeParse(values);

    if (!fields.success) {
        return {
            error: "Invalid fields"
        }
    }

    const {
        email, password
    } = fields.data;

    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    });

    if (!existingUser) {
        return {
            error: `Invalid email or password`
        };
    }

    // Is OAuth
    if (existingUser.password === null) {
        return {
            error: "Invalid email or password"
        };
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
        return {
            error: "Invalid email or password"
        };
    }

    if (!existingUser.emailVerified) {
        return {
            error: "Please verify your email",
            action: "EMAIL_NOT_VERIFIED"
        };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies()
        .set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

    return {
        success: "Logged in"
    }
}


export const register = async (values: IRegister): Promise<ActionResult> => {
    "use server";
    const fields = registerSchema.safeParse(values);

    if (!fields.success) {
        return {
            error: "Invalid fields"
        }
    }

    const {
        email, password, username: name
    } = fields.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await db.user.findFirst({
        where: {
            OR: [
                { email },
                { name }
            ]
        }
    });

    if (userExists) {
        if (userExists.email === email) {
            return {
                error: "Email already exists"
            }
        }

        if (userExists.name === name) {
            return {
                error: "Username already exists"
            }
        }
    }

    const newUser = await db.user.create({
        data: {
            name,
            password: hashedPassword,
            email
        }
    });

    if (!newUser) {
        return {
            error: "Something went wrong when creating user"
        }
    }

    // TODO: Create verification link, then send the email using Resend

    // TODO: Run this code on verification, not on sign up
    // ...................................................
    // const session = await lucia.createSession(newUser.id, {});
    // const sessionCookie = lucia.createSessionCookie(session.id);
    // cookies().set(
    //     sessionCookie.name,
    //     sessionCookie.value,
    //     sessionCookie.attributes
    // );

    return {
        success: "We sent a verification link to your email!"
    }

}

export const updateUsername = async (id: string, values: IGoogleName): Promise<ActionResult> => {
    "use server";
    const fields = goolgeNameSchema.safeParse(values);

    if (!fields.success) {
        return {
            error: "Invalid fields"
        }
    }

    const { username } = fields.data;

    const validate = await validateRequest(true);

    if (!validate.user) {
        return {
            error: "Unauthorized (1)"
        }
    }

    if (validate.user.name) {
        return {
            error: "Username already set"
        }
    }

    const user = await db.user.findUnique({
        where: {
            id
        }
    });

    if (!user) {
        return {
            error: "Invalid email"
        }
    }

    await db.user.update({
        where: {
            id
        },
        data: {
            name: username
        }
    });


    return {
        success: "Username successfully set!"
    }
}
interface ActionResult {
    error?: string;
    success?: string;
    action?: "EMAIL_NOT_VERIFIED"
}
