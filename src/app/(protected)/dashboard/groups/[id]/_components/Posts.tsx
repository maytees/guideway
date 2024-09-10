"use client";
import { type User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  Eye,
  Flag,
  Heart,
  MessageSquare,
  Pencil,
  PinIcon,
  Share2,
  Trash
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { likePost } from "~/actions/dashboard/like-post";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { type GroupWithMembersAndPosts } from "~/lib/types";
import { usePostStore } from "~/stores/post-store";
import CreatePostButton from "./CreatePostButton";
import ReadMore from "./Readmore";
import { colors } from "./TagsSetting";

const Posts = (props: {
  group: GroupWithMembersAndPosts;
  currentUser: User;
}) => {
  const [likingPosts, setLikingPosts] = useState<Record<string, boolean>>({});
  // Sort posts to bring pinned posts to the top
  const { posts, setPosts } = usePostStore();
  const sortedPosts = [...posts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const commentInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const toggleComments = (postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const focusCommentInput = (postId: string) => {
    if (commentInputRefs.current[postId]) {
      commentInputRefs.current[postId]?.focus();
    }
    if (!showComments[postId]) {
      toggleComments(postId);
    }
  };

  const likePostSubmit = async (postId: string) => {
    setLikingPosts((prev) => ({ ...prev, [postId]: true }));
    try {
      const data = await likePost(postId);
      if (data.success) {
        toast.success(data.success);
      }
      if (data.error) {
        toast.error(data.error);
      }
    } finally {
      setLikingPosts((prev) => ({ ...prev, [postId]: false }));
    }
  };

  useEffect(() => {
    setPosts(props.group.posts);
  }, [props.group.posts, setPosts]);

  return (
    <div className="w-9/12 space-y-4">
      {sortedPosts.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Whoops...</CardTitle>
            <CardDescription>
              Doesn&apos;t seem like there are any posts in this group.
            </CardDescription>
            <div className="pt-5">
              <CreatePostButton
                group={props.group}
                currentUser={props.currentUser}
              />
            </div>
          </CardHeader>
        </Card>
      )}
      {sortedPosts.map((post) => (
        <Card key={post.id}>
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
              {/* Pinned tag should always be first? */}
              <div className="flex flex-row items-center gap-2">
                {post.isPinned && (
                  <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                    Pinned
                  </span>
                )}
                {post.tags.map((tag, index) => {
                  const colorObj =
                    colors.find((c) => c.bg === tag.color) ?? colors[0];
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
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="p-2">
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <PinIcon className="mr-2 h-4 w-4" />
                    <span>Pin Post</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Flag className="mr-2 h-4 w-4" />
                    <span>Report</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View Analytics</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <h4 className="mb-2 text-lg font-semibold">{post.title}</h4>
            <span className="w-full whitespace-pre text-pretty break-words">
              <ReadMore maxLength={500}>{post.content}</ReadMore>
            </span>
          </CardContent>
          <CardFooter className="mt-2 flex flex-col gap-2">
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
                      <Heart className={`h-4 w-4 ${post.likes.some(like => like.user_id === props.currentUser.id) ? 'fill-current' : ''}`} />
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
                  <p>Number of times this post has been viewed</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="mt-1 w-full">
              <div className="mb-6 flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={props.currentUser.image ?? undefined} />
                  <AvatarFallback>
                    {props.currentUser.name?.substring(0, 2)}
                  </AvatarFallback>
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
              {post.comments.length > 0 && (
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
                      <div
                        key={comment.id}
                        className="mb-2 flex items-start space-x-2"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={comment.author.image ?? undefined}
                          />
                          <AvatarFallback>
                            {comment.author.name?.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow rounded-lg bg-gray-100 p-2">
                          <p className="flex items-center justify-between text-sm font-semibold">
                            {comment.author.name}
                            <span className="text-xs text-gray-500">
                              {formatDistanceToNow(
                                new Date(comment.created_at),
                                {
                                  addSuffix: true,
                                },
                              )}
                            </span>
                          </p>
                          <p className="text-sm">{comment.content}</p>
                          <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 py-1"
                              disabled={true}
                            >
                              <Heart className="mr-1 h-4 w-4" />
                              {comment.likes.length}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
