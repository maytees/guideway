import { google, lucia } from "../../../../server/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { env } from "~/env";

type GoogleUser = {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
};

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);

    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const storedState = cookies().get("google_oauth_state")?.value ?? null;
    const storedCodeVerifier = cookies().get("google_oauth_code_verifier")?.value ?? null;

    if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(
            code, storedCodeVerifier
        );

        const googleUserResponse = await fetch(
            "https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });

        const googleUser = (await googleUserResponse.json()) as GoogleUser;

        if (!googleUser.email) {
            return new Response("Missing email", {
                status: 400
            });
        }

        if (!googleUser.email_verified) {
            new Response("Email not verified", {
                status: 400
            });
        }

        const existingUser = await db.user.findUnique({
            where: {
                google_id: googleUser.sub
            }
        });

        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name, sessionCookie.value, sessionCookie.attributes
            );

            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/"
                }
            });
        }

        const emailExists = await db.user.findUnique({
            where: {
                email: googleUser.email
            }
        });

        if (emailExists) {
            return NextResponse.redirect(env.BASE_URL + "/auth/register?code=409");
        }

        const newUser = await db.user.create({
            data: {
                google_id: googleUser.sub,
                email: googleUser.email,
                emailVerified: new Date()
            }
        });

        const session = await lucia.createSession(newUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name, sessionCookie.value, sessionCookie.attributes
        );
        return new Response(null, {
            status: 302,
            headers: {
                Location: `/auth/oauth?requiresName=true&id=${newUser.id}`
            }
        });

    } catch (error) {
        console.log(error, "er");
        if (error instanceof OAuth2RequestError) {
            return new Response(null, {
                status: 400
            });
        }

        return new Response(null, {
            status: 500
        });
    }
}