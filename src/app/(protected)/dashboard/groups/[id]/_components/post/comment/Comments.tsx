"use client";
import { type CommentLike } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { ChevronDown, ChevronUp, Heart } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { likeComment } from "~/actions/dashboard/like-comment";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { type PostWithAuthor } from "~/lib/types";
import { useUserStore } from "~/stores/user-store";

interface CommentsProps {
  post: PostWithAuthor;
  showComments: Record<string, boolean>;
  toggleComments: (postId: string) => void;
}

export const Comments = ({
  post,
  showComments,
  toggleComments,
}: CommentsProps) => {
  const [isLiking, startLikingTransition] = useTransition();
  const { user: currentUser } = useUserStore();

  function handleLikeComment(commentId: number) {
    startLikingTransition(() => {
      likeComment(commentId)
        .then((data) => {
          if (data.error) {
            toast.error("Failed to like comment", { description: data.error });
            return;
          }

          toast.success(data.success);
        })
        .catch((e) => {
          toast.error(e as string);
        });
    });
  }
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <h5 className="font-semibold">Comments</h5>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleComments(post.id.toString())}
        >
          {showComments[post.id] ? (
            <>
              Hide Comments <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Show Comments <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {showComments[post.id] &&
        post.comments.map((comment) => (
          <div key={comment.id} className="mb-2 flex items-start space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.author.image ?? undefined} />
              <AvatarFallback>
                {comment.author.name?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow rounded-lg bg-secondary p-2">
              <p className="flex items-center justify-between text-sm font-semibold">
                {comment.author.name}
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), {
                    addSuffix: true,
                  })}
                </span>
              </p>
              <p className="text-sm">{comment.content}</p>
              <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                <Button
                  onClick={() => {
                    handleLikeComment(comment.id);
                  }}
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 py-1"
                  disabled={isLiking}
                >
                  <Heart
                    className={`mr-1 h-4 w-4 ${comment.likes.some((like: CommentLike) => like.user_id === currentUser?.id) ? "fill-current" : ""}`}
                  />
                  {comment.likes.length}
                </Button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
