import { create } from "zustand";
import { PostWithAuthor } from "~/lib/types";

type PostStore = {
  posts: PostWithAuthor[];
  addPost: (post: PostWithAuthor) => void;
  setPosts: (posts: PostWithAuthor[]) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  setPosts: (posts) => set({ posts }),
}));
