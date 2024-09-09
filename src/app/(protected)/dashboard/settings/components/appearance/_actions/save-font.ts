"use server";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

export async function saveFont(formData: FormData, userId: string) {
    "use server";

    const font = formData.get("font") as string;

    await db.user.update({
        where: {
            id: userId,
        },
        data: {
            font: font ?? undefined,
        },
    });

    revalidatePath("/", "layout");
}