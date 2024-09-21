"use server";

import { revalidatePath } from "next/cache";
import { type IDefaultRole } from "~/lib/validation";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
    error?: string;
    success?: string;
}

export async function saveDefaultRole(
    data: IDefaultRole,
    groupId: string,
): Promise<ActionResult> {
    const { user } = await validateRequest();

    if (!user) {
        return {
            error: "Unauthorized!",
        };
    }

    try {
        // Update the current default role to false
        await db.role.updateMany({
            where: { groupId, isDefault: true },
            data: { isDefault: false },
        });

        // Set the new default role
        await db.role.update({
            where: { id: data.defaultRoleId },
            data: { isDefault: true },
        });

        revalidatePath(`/dashboard/groups/settings/${groupId}`);

        return {
            success: "Updated Default Role!",
        };
    } catch (error) {
        console.error("Failed to update default role:", error);
        return {
            error: "Failed to update default role!",
        };
    }
}
