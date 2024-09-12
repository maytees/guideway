"use server";

import { revalidatePath } from "next/cache";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
  error?: string;
  success?: string;
}

export async function postComment(
  postId: number,
  content: string,
): Promise<ActionResult> {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "Unauthorized!",
    };
  }

  const newComment = await db.comment.create({
    data: {
      author_id: user.id,
      content,
      post_id: postId,
    },
  });

  if (!newComment) {
    return {
      error: "Something went wrong while creating comment!",
    };
  }

  revalidatePath("/dashboard", "layout");

  return {
    success: "Comment successfully posted!",
  };
}
