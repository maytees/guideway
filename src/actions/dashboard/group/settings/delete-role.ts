"use server";

import { revalidatePath } from "next/cache";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
  error?: string;
  success?: string;
}

export async function deleteRole(roleId: string): Promise<ActionResult> {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "Unauthorized!",
    };
  }

  const deletedRole = await db.role.delete({
    where: {
      id: roleId,
    },
  });

  if (!deletedRole) {
    return {
      error: "Couldn't find role with id" + roleId,
    };
  }

  revalidatePath("/dashboard/groups/settings/[id]", "page");

  return {
    success: "Successfully deleted role.",
  };
}
