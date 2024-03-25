"use server";

import { type ILogin, loginSchema } from "~/lib/validation";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { lucia } from "~/server/auth";

export const login = async (values: ILogin): Promise<ActionResult> => {
    "use server";
    const fields = loginSchema.safeParse(values);

    if (!fields.success) {
        return {
            error: "Invalid fields"
        }
    }

    const {
        cred, password
    } = fields.data;

    let isEmail = false;
    if (cred.includes("@")) isEmail = true;

    const existingUser = isEmail ? await db.user.findUnique({
        where: {
            email: cred
        }
    }) : await db.user.findUnique({
        where: {
            name: cred
        }
    });

    if (!existingUser) {
        return {
            error: `Invalid ${isEmail ? "email" : "username"} or password`
        };
    }

    // Is OAuth
    if (existingUser.password === null) {
        return {
            error: "Invalid username or password"
        };
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
        return {
            error: "Invalid username or password"
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
        success: "Success"
    }
}

interface ActionResult {
    error?: string;
    success?: string;
}
