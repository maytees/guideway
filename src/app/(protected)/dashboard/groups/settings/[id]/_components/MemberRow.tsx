"use client";

import { type Prisma } from "@prisma/client";
import { Mail, MoreHorizontal, UserCog } from "lucide-react";
import useSWR from 'swr';
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { TableCell, TableRow } from "~/components/ui/table";

type Member = Prisma.UserGetPayload<{}>;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const MemberRow = ({
    member,
    groupId,
}: {
    member: Member;
    groupId: string;
}) => {
    const { data: role, error } = useSWR(`/api/getUserRole?userId=${member.id}&groupId=${groupId}`, fetcher);

    return (
        <TableRow>
            <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src={member.image ?? undefined} alt={member.name ?? ""} />
                        <AvatarFallback>{member.name?.charAt(0) ?? "U"}</AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                </div>
            </TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>
                {error ? (
                    <span>Error loading role</span>
                ) : !role ? (
                    <span>Loading...</span>
                ) : (
                    <span
                        className="w-fit rounded px-2 py-1 text-xs font-semibold"
                        style={{
                            backgroundColor: role.color,
                            color: role.textColor || '#000000',
                        }}
                    >
                        {role.name}
                    </span>
                )}
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Email user</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <UserCog className="mr-2 h-4 w-4" />
                                <span>Change Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                {/* TODO: Show all roles from the group */}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuItem>Remove from group</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};