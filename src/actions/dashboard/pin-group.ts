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

  // Fetch the user with their current pinned groups
  const currentUser = await db.user.findUnique({
    where: { id: user.id },
    include: { pinnedGroups: true, groups: true }
  });

  if (!currentUser) {
    return {
      error: "User not found",
    };
  }

  const isPinned = currentUser.pinnedGroups.some(group => group.id === groupId);
  let updatedPinnedGroups;

  if (isPinned) {
    // Remove the group from pinned groups
    updatedPinnedGroups = currentUser.pinnedGroups.filter(group => group.id !== groupId);
  } else {
    // Add the group to pinned groups
    updatedPinnedGroups = [...currentUser.pinnedGroups, { id: groupId }];
  }

  // Update the user's pinned groups
  await db.user.update({
    where: { id: user.id },
    data: {
      pinnedGroups: {
        set: updatedPinnedGroups.map(group => ({ id: group.id })),
      },
    },
  });

  const group = await db.group.findUnique({ where: { id: groupId } });

  return {
    success: `Successfully ${isPinned ? 'unpinned' : 'pinned'} ${group?.name || 'group'}`,
    isPinned: !isPinned,
  };
}
