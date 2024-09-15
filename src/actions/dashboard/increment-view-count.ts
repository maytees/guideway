"use server";

import { db } from "~/server/db";

export async function incrementViewCount(postId: string) {
    try {
        await db.post.update({
            where: { id: parseInt(postId) },
            data: { viewCount: { increment: 1 } },
        });
    } catch (error) {
        console.error("Error incrementing view count:", error);
    }
}