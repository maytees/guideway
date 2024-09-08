import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "~/components/ui/button";
import { CommentsWithAuthor } from "~/lib/types";
import Comment from "./Comment";

interface CommentSectionProps {
    comments: CommentsWithAuthor[];
    showComments: boolean;
    toggleComments: () => void;
}

const CommentSection = ({ comments, showComments, toggleComments }: CommentSectionProps) => {
    if (comments.length === 0) return null;

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h5 className="font-semibold">Comments</h5>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleComments}
                >
                    {showComments ? (
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
            {showComments && comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </>
    );
};

export default CommentSection;
