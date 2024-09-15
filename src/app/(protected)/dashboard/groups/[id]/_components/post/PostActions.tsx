"use client";
import { type Like, type User } from "@prisma/client";
import {
  Bookmark,
  Eye,
  Flag,
  Heart,
  MessageSquare,
  Share2,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { type PostWithAuthor } from "~/lib/types";

interface PostActionsProps {
  post: PostWithAuthor;
  currentUser: User;
  likePostSubmit: (postId: string) => Promise<void>;
  likingPosts: Record<string, boolean>;
  focusCommentInput: (postId: string) => void;
}

export const PostActions = ({
  post,
  currentUser,
  likePostSubmit,
  likingPosts,
  focusCommentInput,
}: PostActionsProps) => (
  <div className="flex w-full items-center justify-between">
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => likePostSubmit(post.id.toString())}
            disabled={likingPosts[post.id.toString()]}
          >
            <Heart
              className={`h-4 w-4 ${post.likes.some((like: Like) => like.user_id === currentUser.id) ? "fill-current" : ""}`}
            />
            <span className="ml-1">{post.likes.length}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Like this post</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => focusCommentInput(post.id.toString())}
          >
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
            <Bookmark className="h-4 w-4" />
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
        <p>View Count</p>
      </TooltipContent>
    </Tooltip>
  </div>
);
