"use client";

import { Loader2 } from "lucide-react";
import { usePostStore } from "~/stores/post-store";

const TotalPosts = () => {
  const { posts } = usePostStore();
  // Feature not a bug, I want to overwhelm the user when they dont post anything :)
  if (!posts || posts.length == 0) {
    return <Loader2 className="size-4 animate-spin" />;
  }
  return posts.length;
};

export default TotalPosts;
