"use server";

import { type PostWithAuthor, type Tag } from "~/lib/types";
import { postSchema, type IPost } from "~/lib/validation";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
  error?: string;
  success?: string;
  post?: PostWithAuthor;
}

export async function createPost(
  values: IPost,
  tags: Tag[],
  club_id: string,
): Promise<ActionResult> {
  "use server";

  const fields = postSchema.safeParse(values);

  if (!fields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { content, isPinned, title } = fields.data;

  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "User is not validated",
    };
  }

  // Later on, check if user is even able to post in the group
  // via perms!

  const post = await db.post.create({
    data: {
      title,
      content,
      isPinned,
      author_id: user.id,
      club_id,
      tags: {
        create: tags.map((tag) => ({
          value: tag.value,
          color: tag.color,
        })),
      },
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

  if (!post) {
    return {
      error: "Failed to create post",
    };
  }

  return {
    success: "Post created successfully",
    post,
  };
}
