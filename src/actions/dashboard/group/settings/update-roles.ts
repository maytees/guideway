"use server";
import { type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
  error?: string;
  success?: string;
  roles?: Prisma.RoleGetPayload<{
    include: {
      users: true;
    };
  }>[];
}

export async function updateRoles(
  groupId: string,
  roleOrders: Record<number, number>, // Changed from Record<string, number>
): Promise<ActionResult> {
  const { user } = await validateRequest();
  if (!user) {
    return {
      error: "Unauthorized!",
    };
  }

  try {
    const updatedRoles = await db.$transaction(async (tx) => {
      // Fetch all roles for the group
      const roles = await tx.role.findMany({
        where: { groupId },
        orderBy: { order: "asc" },
      });

      // Create a map of current orders to role IDs
      const orderToRoleId = roles.reduce(
        (acc, role) => {
          acc[role.order] = role.id;
          return acc;
        },
        {} as Record<number, string>,
      );

      // Update the order of each role
      for (const [oldOrder, newOrder] of Object.entries(roleOrders)) {
        const roleId = orderToRoleId[Number(oldOrder)];
        if (roleId) {
          await tx.role.update({
            where: { id: roleId },
            data: { order: newOrder },
          });
        }
      }

      // Fetch the updated roles
      return tx.role.findMany({
        where: { groupId },
        orderBy: { order: "asc" },
        include: { users: true },
      });
    });

    revalidatePath("/dashboard/groups/settings/[id]", "page");
    return {
      success: "Successfully updated role order.",
      roles: updatedRoles,
    };
  } catch (error) {
    console.error("Error updating roles:", error);
    return {
      error: "Could not update order!",
    };
  }
}
