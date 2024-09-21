"use server";

import { type Prisma } from "@prisma/client";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
  error?: string;
  role?: Prisma.RoleGetPayload<{
    include: {
      users: true;
    };
  }>;
}

export async function getUserRoleInGroup(
  userId: string,
  groupId: string,
): Promise<ActionResult> {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }
  const userRole = await db.role.findFirst({
    where: {
      groupId: groupId,
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      users: true,
    },
  });

  if (!userRole) {
    return {
      error: "Could not find user role!",
    };
  }

  return {
    role: userRole,
  };
}
