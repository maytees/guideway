"use server";

import { revalidatePath } from "next/cache";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
    error?: string;
    success?: string;
}

export async function updateRole(
    roleId: string,
    groupId: string,
    name: string,
    color: string
): Promise<ActionResult> {
    const { user } = await validateRequest();

    if (!user) {
        return {
            error: "User is not authenticated",
        };
    }

    try {
        await db.role.update({
            where: {
                id: roleId,
                groupId: groupId,
            },
            data: {
                name,
                color,
            },
        });

        revalidatePath(`/dashboard/groups/settings/${groupId}`);

        return {
            success: "Role updated successfully",
        };
    } catch (error) {
        return {
            error: "An error occurred while updating the role",
        };
    }
}