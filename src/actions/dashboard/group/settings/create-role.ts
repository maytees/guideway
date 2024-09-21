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

  try {
    const newRole = await db.$transaction(async (tx) => {
      // Find the maximum order in the group
      const maxOrderRole = await tx.role.findFirst({
        where: { groupId },
        orderBy: { order: "desc" },
        select: { order: true },
      });

      // Calculate the new order
      const newOrder = (maxOrderRole?.order ?? 0) + 1;

      // Create the new role
      return tx.role.create({
        data: {
          groupId,
          users: {
            connect: userIds.map((id) => ({ id })),
          },
          color: bgColor,
          name,
          order: newOrder,
          // permissions: {
          //   connect: permissions.map((id) => ({ id })),
          // },
        },
      });
    });

    if (!newRole) {
      return {
        error: "Could not create new role!",
      };
    }

    // Reorder all roles in the group to ensure consistency
    await db.role.updateMany({
      where: { groupId },
      data: {
        order: {
          increment: 1,
        },
      },
    });

    await db.role.update({
      where: { id: newRole.id },
      data: { order: 1 },
    });

    revalidatePath("/dashboard/groups/settings/[id]", "page");
    return {
      success: "Successfully created new role!",
    };
  } catch (error) {
    console.error("Error creating role:", error);
    return {
      error: "An error occurred while creating the role.",
    };
  }
}
