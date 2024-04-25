"use server";

import { sendSubscribeEmail } from "~/lib/email";
import { type IUpdatesSignup, updatesSignupSchema } from "~/lib/validation";
import { db } from "~/server/db";

export const welcomeUpdates = async (values: IUpdatesSignup) => {
    "use server";

    const fields = updatesSignupSchema.safeParse(values);
    if (!fields.success) {
        return {
            error: "Invalid Fields"
        };
    }

    const {
        email, firstName
    } = fields.data;

    const existingEmail = await db.updatesUser.findUnique({
        where: {
            email
        }
    });

    if (existingEmail) {
        return {
            error: "Email already exists"
        };
    }

    const newRecipient = await db.updatesUser.create({
        data: {
            firstName,
            email
        }
    });

    if (!newRecipient) {
        return {
            error: "Something went wrong"
        };
    }

    await sendSubscribeEmail(email, firstName);

    return {
        success: "Subscribed to updates!"
    };
};