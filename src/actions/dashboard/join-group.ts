"use server";
import { type GroupWithMembers } from "~/lib/types";
import { formatJoinCode } from "~/lib/utils";
import { type IJoinGroupCode, joinGroupSchema } from "~/lib/validation";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
  error?: string;
  success?: string;
  group?: GroupWithMembers;
}

export async function joinGroup(values: IJoinGroupCode): Promise<ActionResult> {
  "use server";

  const fields = joinGroupSchema.safeParse(values);

  if (!fields.success) {
    return {
      error: "Invalid Fields",
    };
  }

  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "User is not validated",
    };
  }

  const { joinCode } = fields.data;

  const formattedCode = formatJoinCode(joinCode);

  if (!formattedCode) {
    return {
      error: "Invalid join code!",
    };
  }

  const group = await db.group.findUnique({
    where: {
      join_code: formattedCode,
    },
    include: {
      members: true,
    },
  });

  if (!group) {
    return {
      error: "Join code invalid!",
    };
  }

  const existingUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      groups: {
        where: {
          id: group.id,
        },
      },
    },
  });

  if (!existingUser) {
    return {
      error: "User does not exist",
    };
  }

  const userExists = existingUser?.groups.length > 0;

  if (userExists) {
    return {
      error: "You are already in this group!",
    };
  }

  await db.group.update({
    where: {
      join_code: formattedCode,
    },
    data: {
      members: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return {
    success: "Successfully joined new group",
    group,
  };
}
