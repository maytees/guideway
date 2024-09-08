import { CardContent } from "~/components/ui/card";
import { PostWithAuthor } from "~/lib/types";

const PostContent = ({ post }: { post: PostWithAuthor }) => {
  return (
    <CardContent>
      <h4 className="mb-2 text-lg font-semibold">{post.title}</h4>
      <p>{post.content}</p>
    </CardContent>
  );
};

export default PostContent;
