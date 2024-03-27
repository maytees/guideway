import { google, lucia } from "../../../../server/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError, generateCodeVerifier } from "arctic";
import { generateId } from "lucia";
import { db } from "~/server/db";

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
            return new Response("Email not verified", {
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

        const newUser = await db.user.create({
            data: {
                google_id: googleUser.sub,
                name: googleUser.name,
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
                Location: "/"
            }
        })

    } catch (error) {
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