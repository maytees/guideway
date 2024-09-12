"use server";

import { revalidatePath } from "next/cache";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
  error?: string;
  success?: string;
}

export async function likeComment(commentId: number): Promise<ActionResult> {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "User is not authenticated",
    };
  }

  try {
    const existingLike = await db.commentLike.findFirst({
      where: {
        comment_id: commentId,
        user_id: user.id,
      },
    });

    if (existingLike) {
      // Unlike the comment
      await db.commentLike.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      // Like the comment
      await db.commentLike.create({
        data: {
          comment_id: commentId,
          user_id: user.id,
        },
      });
    }

    const updatedComment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!updatedComment) {
      return {
        error: "Comment not found",
      };
    }

    revalidatePath("/dashboard", "layout");

    return {
      success: existingLike
        ? "Comment unliked successfully"
        : "Comment liked successfully",
    };
  } catch (error) {
    return {
      error: "An error occurred while processing your request",
    };
  }
}
