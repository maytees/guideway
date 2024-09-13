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

export async function pinPost(postId: number): Promise<ActionResult> {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "User is not authenticated",
    };
  }

  try {
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return {
        error: "Post not found",
      };
    }

    const updatedPost = await db.post.update({
      where: {
        id: postId,
      },
      data: {
        isPinned: !post.isPinned,
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

    revalidatePath("/dashboard");

    return {
      success: updatedPost.isPinned
        ? "Post pinned successfully"
        : "Post unpinned successfully",
      post: updatedPost as PostWithAuthor,
    };
  } catch (error) {
    return {
      error: "An error occurred while processing your request",
    };
  }
}

export async function checkPostPinned(
  postId: number,
): Promise<{ isPinned?: boolean | null; error?: string }> {
  try {
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        isPinned: true,
      },
    });

    if (!post) {
      return {
        error: "Post not found",
      };
    }

    return {
      isPinned: post.isPinned,
    };
  } catch (error) {
    return {
      error: "An error occurred while checking the post's pinned status",
    };
  }
}
