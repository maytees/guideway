"use client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { CardHeader } from "~/components/ui/card";
import { type PostWithAuthor, type Tag } from "~/lib/types";
import { colors } from "~/lib/utils";
import { PostMenu } from "./PostMenu";

interface PostHeaderProps {
  post: PostWithAuthor;
}

export const PostHeader = ({ post }: PostHeaderProps) => (
  <CardHeader className="flex flex-row items-center justify-between">
    <div className="flex flex-row items-start">
      <Avatar>
        <AvatarImage src={post.author.image!} />
        <AvatarFallback>
          <Image
            className="aspect-square size-10 rounded-full"
            src={
              post.author.image ??
              "https://api.dicebear.com/9.x/miniavs/svg?seed=" +
              post.author.name
            }
            alt={post.author.name ?? "User"}
            width={32}
            height={32}
          />
        </AvatarFallback>
      </Avatar>
      <div className="mx-2 mr-5 flex-grow">
        <h3 className="font-semibold">{post.author.name}</h3>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(post.created_at), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="flex flex-row items-center gap-2">
        {post.isPinned && (
          <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
            Pinned
          </span>
        )}
        {post.tags.map((tag: Tag, index: number) => {
          const colorObj = colors.find((c) => c.bg === tag.color) ?? colors[0];
          return (
            <span
              key={index}
              className="rounded px-2 py-1 text-xs font-semibold"
              style={{
                backgroundColor: colorObj?.bg ?? colors[0]?.bg,
                color: colorObj?.text ?? colors[0]?.text,
              }}
            >
              {tag.value}
            </span>
          );
        })}
      </div>
    </div>
    <PostMenu postId={post.id} />
  </CardHeader>
);
