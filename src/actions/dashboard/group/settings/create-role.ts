"use server";

import { revalidatePath } from "next/cache";
import { type IRoleName, roleNameSchema } from "~/lib/validation";
import { db } from "~/server/db";

interface ActionResult {
  error?: string;
  success?: string;
}

export async function createRole(
  values: IRoleName,
  groupId: string,
  userIds: string[],
  permissions: string[],
  bgColor: string,
): Promise<ActionResult> {
  "use server";
  console.log(bgColor);
  const fields = roleNameSchema.safeParse(values);

  if (!fields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { name } = fields.data;

  const newRole = await db.role.create({
    data: {
      groupId,
      users: {
        connect: userIds.map((id) => ({ id })),
      },
      color: bgColor,
      name,
    },
  });

  if (!newRole) {
    return {
      error: "Could not create new role!",
    };
  }

  revalidatePath("/dashboard/groups/settings/[id]", "page");

  return {
    success: "Successfully created new role!",
  };
}
