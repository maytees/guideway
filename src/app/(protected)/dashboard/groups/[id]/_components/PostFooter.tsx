import { type User } from "@prisma/client";
import {
  Bookmark,
  Eye,
  Flag,
  MessageSquare,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { type PostWithAuthor } from "~/lib/types";
import CommentSection from "./CommentSection";

interface PostFooterProps {
  post: PostWithAuthor;
  currentUser: User;
  showComments: boolean;
  toggleComments: () => void;
}

const PostFooter = ({
  post,
  currentUser,
  showComments,
  toggleComments,
}: PostFooterProps) => {
  const commentInputRef = useRef<HTMLInputElement>(null);

  const focusCommentInput = () => {
    commentInputRef.current?.focus();
    if (!showComments) {
      toggleComments();
    }
  };

  return (
    <CardFooter className="mt-2 flex flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4" />
                <span className="ml-1">{post.likes.length}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Like this post</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={focusCommentInput}>
                <MessageSquare className="h-4 w-4" />
                <span className="ml-1">{post.comments.length}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Comment on this post</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
                <span className="ml-1">{post.shareCount}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share this post</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Bookmark fill="black" className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save this post</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Flag className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Report</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-sm text-gray-500">
              <Eye className="mr-1 inline-block h-4 w-4" />
              {post.viewCount}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Number of times this post has been viewed</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="mt-1 w-full">
        <div className="mb-6 flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.image ?? undefined} />
            <AvatarFallback>{currentUser.name?.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <Input
            placeholder="Write a comment..."
            className="flex-grow"
            ref={commentInputRef}
          />
          <Button size="sm">Post</Button>
        </div>
        <CommentSection
          comments={post.comments}
          showComments={showComments}
          toggleComments={toggleComments}
        />
      </div>
    </CardFooter>
  );
};

export default PostFooter;
