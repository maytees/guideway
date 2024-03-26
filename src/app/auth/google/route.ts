import { generateCodeVerifier, generateState } from "arctic";
import { google } from "../../../server/auth";
import { cookies } from "next/headers";
import { env } from "process";

export async function GET(): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email"],
    });

    cookies().set("google_oauth_state", state, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: env.NODE_ENV === "production",
        maxAge: 60 * 10
    });

    cookies().set("google_oauth_code_verifier", codeVerifier, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: env.NODE_ENV === "production",
        maxAge: 60 * 10
    });

    return Response.redirect(url);
}