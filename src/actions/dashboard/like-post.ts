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

export async function likePost(postId: string): Promise<ActionResult> {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "User is not authenticated",
    };
  }

  try {
    const existingLike = await db.like.findFirst({
      where: {
        post_id: parseInt(postId),
        user_id: user.id,
      },
    });

    if (existingLike) {
      // Unlike the post
      await db.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      // Like the post
      await db.like.create({
        data: {
          post_id: parseInt(postId),
          user_id: user.id,
        },
      });
    }

    const updatedPost = await db.post.findUnique({
      where: {
        id: parseInt(postId),
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

    if (!updatedPost) {
      return {
        error: "Post not found",
      };
    }

    revalidatePath("/dashboard");

    return {
      success: existingLike
        ? "Post unliked successfully"
        : "Post liked successfully",
      post: updatedPost as PostWithAuthor,
    };
  } catch (error) {
    return {
      error: "An error occurred while processing your request",
    };
  }
}
