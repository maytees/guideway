"use server";

import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

export async function saveTheme(formData: FormData, userId: string) {
    "use server";

    const colorScheme = formData.get("color") as string;

    await db.user.update({
        where: {
            id: userId,
        },
        data: {
            colorScheme: colorScheme ?? undefined,
        },
    });

    revalidatePath("/", "layout");
}