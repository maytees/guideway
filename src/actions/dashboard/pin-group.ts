  "use server";

import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
  error?: string;
  success?: string;
  isPinned?: boolean;
}

export async function togglePin(groupId: string): Promise<ActionResult> {
  "use server";

  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "User is not validated",
    };
  }

  const group = await db.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      pinnedBy: true,
    },
  });

  if (!group) {
    return {
      error: "Could not find group with id",
    };
  }

  const isPinned = group.pinnedBy.some((pinnedUser) => pinnedUser.id === user.id);

  if (isPinned) {
    await db.group.update({
      where: {
        id: groupId,
      },
      data: {
        pinnedBy: {
          disconnect: {
            id: user.id,
          },
        },
      },
    });
  } else {
    await db.group.update({
      where: {
        id: groupId,
      },
      data: {
        pinnedBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  return {
    success: `Successfully ${isPinned ? 'unpinned' : 'pinned'} ${group.name}`,
    isPinned: !isPinned,
  };
}
