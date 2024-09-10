"use server";

import { revalidatePath } from "next/cache";
import { type PostWithAuthor } from "~/lib/types";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
  error?: string;
  success?: string;
  post?: PostWithAuthor;
}

export async function deletePost(postId: number): Promise<ActionResult> {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "Unauthorized!",
    };
  }

  const deletedPost = await db.post.delete({
    where: {
      id: postId,
    },
    include: {
      tags: true,
      likes: {
        include: {
          user: true,
        },
      },
      comments: {
        include: {
          likes: true,
          author: true,
        },
      },
      author: true,
    },
  });

  if (!deletedPost) {
    return {
      error: "Couldn't find post with id" + postId,
    };
  }

  revalidatePath("/dashboard/groups/");

  return {
    success: "Successfully deleted post.",
    post: deletedPost,
  };
}
