"use client";
import { type ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { postComment } from "~/actions/dashboard/post-comment";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type PostWithAuthor } from "~/lib/types";
import { useUserStore } from "~/stores/user-store";

interface CommentInputProps {
  commentInputRefs: React.MutableRefObject<
    Record<string, HTMLInputElement | null>
  >;
  post: PostWithAuthor;
}

export const CommentInput = ({ commentInputRefs, post }: CommentInputProps) => {
  const [isCommenting, startCommentingTransition] = useTransition();
  const [content, setContent] = useState("");
  const { user: currentUser } = useUserStore();

  function handlePostComment(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    startCommentingTransition(() => {
      postComment(post.id, content)
        .then((data) => {
          if (data.error) {
            toast.error("Failed to post comment", { description: data.error });
            return;
          }

          toast.success("Success!");
        })
        .catch((e: Error) => {
          toast.error(e.message);
        });
    });
  }

  return (
    <div className="mb-6 flex items-center space-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={currentUser?.image ?? undefined} />
        <AvatarFallback>{currentUser?.name?.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <Input
        disabled={isCommenting}
        placeholder="Write a comment..."
        className="flex-grow"
        value={content}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setContent(e.target.value);
        }}
        ref={(el: HTMLInputElement | null) => {
          if (el) {
            commentInputRefs.current[post.id.toString()] = el;
          }
        }}
      />
      <Button disabled={isCommenting} onClick={handlePostComment} size="sm">
        Post
      </Button>
    </div>
  );
};
