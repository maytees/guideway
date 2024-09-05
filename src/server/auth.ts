import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Google } from "arctic";
import { Lucia, type Session, type User } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { env } from "~/env";
import { db } from "./db";

interface DatabaseUserAttributes {
  email: string;
  name: string;
  google_id?: string;
}

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // Cookie doesnt expire, because nextauth doesnt
    // lucia to extend cookie exp
    expires: false,
    attributes: {
      // Sets to true for https
      secure: env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes): DatabaseUserAttributes => {
    return {
      email: attributes.email,
      name: attributes.name,
      google_id: attributes.google_id,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

// Checks if there is a current via cookie, if so then validate it,
// then update the cookie if necessary. Use cache() to prevent
// unnecessary database calls
export const validateRequest = cache(
  async (
    noRedirect?: boolean,
  ): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const res = await lucia.validateSession(sessionId);
    // Nextjs throws when setting cookie when rendering page
    try {
      if (res.session && res.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(res.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!res.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}

    if (res.user && !res.user.name && !noRedirect) {
      return redirect(
        `${env.NODE_ENV === "production" ? "https://www.guideway.co" : env.BASE_URL}/auth/oauth?requiresName=true&id=${res.user.id}`,
      );
    }

    return res;
  },
);

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  `${env.NODE_ENV === "production" ? "https://www.guideway.co" : env.BASE_URL}/auth/google/callback`,
);
