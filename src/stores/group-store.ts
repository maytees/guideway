import { create } from "zustand";
import { type GroupWithMembers } from "~/lib/types";

type GroupStore = {
  groups: GroupWithMembers[];
  addGroup: (group: GroupWithMembers) => void;
  setGroups: (groups: GroupWithMembers[]) => void;
};

export const useGroupStore = create<GroupStore>((set) => ({
  groups: [],
  addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),
  setGroups: (groups) => set({ groups }),
}));
