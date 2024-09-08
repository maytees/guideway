import { formatDistanceToNow } from "date-fns";
import { ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { CommentsWithAuthor } from "~/lib/types";

const Comment = ({ comment }: { comment: CommentsWithAuthor }) => {
    return (
        <div className="mb-2 flex items-start space-x-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src={comment.author.image ?? undefined} />
                <AvatarFallback>
                    {comment.author.name?.substring(0, 2)}
                </AvatarFallback>
            </Avatar>
            <div className="flex-grow rounded-lg bg-gray-100 p-2">
                <p className="text-sm flex items-center justify-between font-semibold">
                    {comment.author.name}
                    <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(comment.created_at), {
                            addSuffix: true,
                        })}
                    </span>
                </p>
                <p className="text-sm">{comment.content}</p>
                <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 py-1"
                    >
                        <ThumbsUp className="h-4 w-4 mr-1" /> ({comment.likes.length})
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Comment;
