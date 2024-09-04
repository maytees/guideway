import { type Group, type User } from "@prisma/client";

export type LoginActions = "EMAIL_NOT_VERIFIED";
export interface GroupWithMembers extends Group {
  members: User[];
  pinnedBy: User[];
}
