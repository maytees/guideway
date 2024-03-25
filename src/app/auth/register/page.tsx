import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { lucia } from "~/server/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterForm from "~/components/forms/RegisterForm";

export default async function Page() {
    return (
        <>
            <RegisterForm />
        </>
    );
}

// async function signup(formData: FormData): Promise<ActionResult> {
//     "use server";
//     const username = formData.get("username");

//     if (
//         typeof username !== "string" ||
//         username.length < 3 ||
//         username.length > 31 ||
//         !/^[a-z0-9_-]+$/.test(username)
//     ) {
//         return {
//             error: "Invalid username"
//         };
//     }

//     const password = formData.get("password");
//     if (typeof password !== "string" || password.length < 6 || password.length > 255) {
//         return {
//             error: "Invalid password"
//         };
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await db.user.create({
//         data: {
//             name: username,
//             password: hashedPassword
//         }
//     });

//     if (!newUser) {
//         return {
//             error: "Failed to create user"
//         };
//     }

//     const session = await lucia.createSession(newUser.id, {});
//     const sessionCookie = lucia.createSessionCookie(session.id);
//     cookies().set(
//         sessionCookie.name, sessionCookie.value, sessionCookie.attributes
//     );
//     return redirect("/");
// }

// interface ActionResult {
//     error: string;
// }
