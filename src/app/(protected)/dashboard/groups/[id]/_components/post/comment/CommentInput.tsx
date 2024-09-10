"use client";
import { type User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type PostWithAuthor } from "~/lib/types";

interface CommentInputProps {
  currentUser: User;
  commentInputRefs: React.MutableRefObject<
    Record<string, HTMLInputElement | null>
  >;
  post: PostWithAuthor;
}

export const CommentInput = ({
  currentUser,
  commentInputRefs,
  post,
}: CommentInputProps) => (
  <div className="mb-6 flex items-center space-x-2">
    <Avatar className="h-8 w-8">
      <AvatarImage src={currentUser.image ?? undefined} />
      <AvatarFallback>{currentUser.name?.substring(0, 2)}</AvatarFallback>
    </Avatar>
    <Input
      placeholder="Write a comment..."
      className="flex-grow"
      ref={(el: HTMLInputElement | null) => {
        if (el) {
          commentInputRefs.current[post.id.toString()] = el;
        }
      }}
    />
    <Button size="sm">Post</Button>
  </div>
);
