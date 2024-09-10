"use client";
import {
  EllipsisVertical,
  Eye,
  Flag,
  Pencil,
  PinIcon,
  Trash,
} from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { deletePost } from "~/actions/dashboard/delete-post";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const PostMenu = ({ postId }: { postId: number }) => {
  const [isDeletingDialogOpen, setIsDeletingDialogOpen] = useState(false);
  const [isDeleting, startDeletingTransition] = useTransition();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDeletingDialogOpen && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isDeletingDialogOpen, countdown]);

  const handleDeletePost = async () => {
    startDeletingTransition(() => {
      deletePost(postId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            return;
          }

          toast.success("Success!", {
            duration: 5000,
            description: "Successfully deleted post: " + data.post?.title,
            position: "top-center",
          });

          setIsDeletingDialogOpen(false);
        })
        .catch((e) => {
          toast.error("Could not delete post: " + e);
        });
    });
  };

  return (
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
          <Dialog
            open={isDeletingDialogOpen}
            onOpenChange={(open) => {
              setIsDeletingDialogOpen(open);
              if (open) setCountdown(5);
            }}
          >
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(event) => {
                  event.preventDefault();
                  setIsDeletingDialogOpen(true);
                }}
                className="text-destructive hover:text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-destructive">
                  Confirm Deletion
                </DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this post? This action is
                  irreversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-col items-center sm:flex-row sm:justify-between">
                <div className="mb-4 text-sm font-medium sm:mb-0">
                  {countdown > 0
                    ? `Please wait ${countdown} seconds`
                    : "You can now delete"}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDeletingDialogOpen(false)}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeletePost}
                    disabled={countdown > 0 || isDeleting}
                    className="relative"
                  >
                    {countdown > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-md bg-destructive/20">
                        <div
                          className="h-full w-full animate-pulse rounded-md bg-destructive/40"
                          style={{
                            animationDuration: `${countdown}s`,
                            animationIterationCount: "1",
                          }}
                        />
                      </div>
                    )}
                    Delete
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
