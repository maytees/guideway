"use client";
import { CardContent } from "~/components/ui/card";
import { type PostWithAuthor } from "~/lib/types";
import ReadMore from "../Readmore";

interface PostContentProps {
  post: PostWithAuthor;
}

export const PostContent = ({ post }: PostContentProps) => (
  <CardContent>
    <h4 className="mb-2 text-lg font-semibold">{post.title}</h4>
    <span className="w-full whitespace-pre text-pretty break-words">
      <ReadMore maxLength={500}>{post.content}</ReadMore>
    </span>
  </CardContent>
);
