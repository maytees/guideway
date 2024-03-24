import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { lucia } from "~/server/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "~/components/forms/LoginForm";

export default async function Page() {
    return (
        <>
            <LoginForm />
        </>
    );
}

async function login(formData: FormData): Promise<ActionResult> {
    "use server";
    const username = formData.get("username");
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-z0-9_-]+$/.test(username)
    ) {
        return {
            error: "Invalid username"
        };
    }

    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return {
            error: "Invalid password"
        };
    }

    const existingUser = await db.user.findUnique({
        where: {
            name: username
        }
    });

    if (!existingUser) {
        return {
            error: "Invalid username or password"
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
    return redirect("/");
}

interface ActionResult {
    error: string;
}
