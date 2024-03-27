import { type ActionResult } from 'next/dist/server/app-render/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import React from 'react'
import { lucia, validateRequest } from '~/server/auth'

const Page = async () => {
    const validate = await validateRequest();

    if (validate instanceof NextResponse) {
        return validate
    }

    const { user } = validate;

    if (!user) {
        redirect('/auth/login')
    }

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <form action={signout}>
                <button type='submit'>Log out</button>
            </form>
        </div>
    )
}

export default Page

async function signout(): Promise<ActionResult> {
    "use server";
    const { session } = await validateRequest();

    if (!session) {
        return {
            error: "Unauthorized"
        }
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies()
        .set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/auth/login");
}