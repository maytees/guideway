import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Google } from "arctic";
import { Lucia, type Session, type User } from "lucia";
import { cookies } from "next/headers";
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
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);

// export const validateRequest = cache(
//   async (
//     noRedirect?: boolean,
//   ): Promise<
//     { user: User; session: Session } | { user: null; session: null }
//   > => {
//     const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

//     if (!sessionId) {
//       return {
//         user: null,
//         session: null,
//       };
//     }

//     const result = await lucia.validateSession(sessionId);

//     if (result.session && result.session.fresh) {
//       const sessionCookie = lucia.createSessionCookie(result.session.id);
//       cookies().set(
//         sessionCookie.name,
//         sessionCookie.value,
//         sessionCookie.attributes,
//       );
//     }
//     if (!result.session) {
//       const sessionCookie = lucia.createBlankSessionCookie();
//       cookies().set(
//         sessionCookie.name,
//         sessionCookie.value,
//         sessionCookie.attributes,
//       );
//     }

//     if (result.user && !result.user.name && !noRedirect) {
//       return redirect(
//         `/auth/oauth?requiresName=true&id=${result.user.id}`,
//       );
//     }

//     return result;
//   },
// );
const redirect = `${env.APP_URL}/auth/google/callback`;
console.log("thing: ", env.APP_URL);
console.log("another thing: ", redirect);

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  redirect,
);
