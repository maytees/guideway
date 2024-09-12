"use client";
import { type User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { likePost } from "~/actions/dashboard/like-post";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type GroupWithMembersAndPosts,
  type PostWithAuthor,
} from "~/lib/types";
import { usePostStore } from "~/stores/post-store";
import CreatePostButton from "./CreatePostButton";
import { PostActions } from "./post/PostActions";
import { PostContent } from "./post/PostContent";
import { PostHeader } from "./post/PostHeader";
import { CommentInput } from "./post/comment/CommentInput";
import { Comments } from "./post/comment/Comments";

interface PostProps {
  post: PostWithAuthor;
  currentUser: User;
  likePostSubmit: (postId: string) => Promise<void>;
  likingPosts: Record<string, boolean>;
  focusCommentInput: (postId: string) => void;
  showComments: Record<string, boolean>;
  toggleComments: (postId: string) => void;
  commentInputRefs: React.MutableRefObject<
    Record<string, HTMLInputElement | null>
  >;
}

const Post = ({
  post,
  currentUser,
  likePostSubmit,
  likingPosts,
  focusCommentInput,
  showComments,
  toggleComments,
  commentInputRefs,
}: PostProps) => (
  <Card key={post.id}>
    <PostHeader post={post} currentUser={currentUser} />
    <PostContent post={post} />
    <CardFooter className="mt-2 flex flex-col gap-2">
      <PostActions
        post={post}
        currentUser={currentUser}
        likePostSubmit={likePostSubmit}
        likingPosts={likingPosts}
        focusCommentInput={focusCommentInput}
      />
      <div className="mt-1 w-full">
        <CommentInput
          currentUser={currentUser}
          commentInputRefs={commentInputRefs}
          post={post}
        />
        {post.comments.length > 0 && (
          <Comments
            post={post}
            currentUser={currentUser}
            showComments={showComments}
            toggleComments={toggleComments}
          />
        )}
      </div>
    </CardFooter>
  </Card>
);

interface PostsProps {
  group: GroupWithMembersAndPosts;
  currentUser: User;
}

const Posts = (props: PostsProps) => {
  const [likingPosts, setLikingPosts] = useState<Record<string, boolean>>({});
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
        <Post
          key={post.id}
          post={post}
          currentUser={props.currentUser}
          likePostSubmit={likePostSubmit}
          likingPosts={likingPosts}
          focusCommentInput={focusCommentInput}
          showComments={showComments}
          toggleComments={toggleComments}
          commentInputRefs={commentInputRefs}
        />
      ))}
    </div>
  );
};

export default Posts;
