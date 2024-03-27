"use server";

import { type ILogin, loginSchema, type IRegister, registerSchema, IGoogleName, goolgeNameSchema } from "~/lib/validation";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "~/server/auth";
import { NextResponse } from "next/server";

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
    console.log("using server")
    const fields = goolgeNameSchema.safeParse(values);

    console.log(fields, "fields");

    if (!fields.success) {
        console.log("no success")
        return {
            error: "Invalid fields"
        }
    }

    const { username } = fields.data;

    console.log(username, "user name")

    const validate = await validateRequest(true);

    console.log(validate, "validate")

    if ((validate instanceof NextResponse)) {
        return {
            error: "Unexpected response"
        }
    }

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

    console.log(user, " user")

    if (!user) {
        console.log("no user")
        return {
            error: "Invalid email"
        }
    }

    const updatedUser = await db.user.update({
        where: {
            id
        },
        data: {
            name: username
        }
    });

    console.log("updated", updatedUser)

    return {
        success: "Username successfully set!"
    }
}
interface ActionResult {
    error?: string;
    success?: string;
    action?: "EMAIL_NOT_VERIFIED"
}
