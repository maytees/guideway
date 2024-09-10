"use client";
import {
  EllipsisVertical,
  Eye,
  Flag,
  Pencil,
  PinIcon,
  Trash,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const PostMenu = () => (
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
);
