import { type User } from "@prisma/client";
import { create } from "zustand";

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
