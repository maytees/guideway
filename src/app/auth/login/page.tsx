"use server";
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
