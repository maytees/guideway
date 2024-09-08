import { User } from "@prisma/client";
import { Card } from "~/components/ui/card";
import { PostWithAuthor } from "~/lib/types";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";

interface PostCardProps {
  post: PostWithAuthor;
  currentUser: User;
  showComments: boolean;
  toggleComments: () => void;
}

const PostCard = ({ post, currentUser, showComments, toggleComments }: PostCardProps) => {
  return (
    <Card>
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostFooter
        post={post}
        currentUser={currentUser}
        showComments={showComments}
        toggleComments={toggleComments}
      />
    </Card>
  );
};

export default PostCard;
