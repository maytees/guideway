import { v4 as uuidv4 } from "uuid";
import { db } from "~/server/db";


export const genVerifiationToken = async (email: string) => {
    const token = uuidv4();
    // Expires in 12 hours
    const expires = new Date(new Date().getTime() + 12 * 60 * 60 * 1000);

    const existsToken = await getVerificationTokenByEmail(email);

    if (existsToken) {
        await db.verificationToken.delete({
            where: {
                id: existsToken.id
            }
        });
    }

    await db.verificationToken.create({
        data: {
            token,
            expires,
            email
        }
    })

    return token
}

export const getVerificationTokenByEmail = async (
    email: string
) => {
    try {
        return await db.verificationToken.findFirst({
            where: {
                email
            }
        });
    } catch {
        return null;
    }
}

export const getVerificationTokenByToken = async (
    token: string
) => {
    try {
        return await db.verificationToken.findUnique({
            where: {
                token
            }
        });
    } catch {
        return null;
    }
}

export const getPasswordResetTokenByToken = async (
    token: string
) => {
    try {
        return await db.passwordResetToken.findUnique({
            where: {
                token
            }
        });
    } catch {
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (
    email: string
) => {
    try {
        return await db.passwordResetToken.findFirst({
            where: {
                email
            }
        });
    } catch {
        return null;
    }
}