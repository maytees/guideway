


import { formatDistanceToNow } from "date-fns";
import { EllipsisVertical, Eye, Flag, Pencil, PinIcon, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { CardHeader } from "~/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { PostWithAuthor } from "~/lib/types";

const PostHeader = ({ post }: { post: PostWithAuthor }) => {
    return (
        <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-4">
                <Avatar>
                    <AvatarImage src={post.author.image ?? undefined} />
                    <AvatarFallback>
                        {post.author.name?.substring(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <h3 className="font-semibold">{post.author.name}</h3>
                    <p className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(post.created_at), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
                {post.isAnnouncement && (
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                        Announcement
                    </span>
                )}
                {post.isPinned && (
                    <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                        Pinned
                    </span>
                )}
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
    );
};

export default PostHeader;