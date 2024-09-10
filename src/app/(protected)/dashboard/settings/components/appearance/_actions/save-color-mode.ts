"use server";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

export async function saveColorMode(colorMode: string, userId: string) {
  "use server";

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      colorMode: colorMode ?? undefined,
    },
  });

  revalidatePath("/", "layout");
}
