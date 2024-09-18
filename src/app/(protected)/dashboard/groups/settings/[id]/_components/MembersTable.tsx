"use client";

import { type Prisma } from "@prisma/client";
import { Mail, MoreHorizontal, Phone, UserCog } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

// Preset roles
const roles = ["Member", "Moderator", "Admin"];

type Member = Prisma.GroupGetPayload<{
  include: {
    members: true;
  };
}>["members"][number] & { role: string };

const MembersTable = (props: {
  group: Prisma.GroupGetPayload<{
    include: {
      members: true;
      roles: {
        include: {
          users: true;
        };
      };
    };
  }>;
}) => {
  const [members, setMembers] = useState<Member[]>(
    props.group.members.map((member) => ({ ...member, role: "Member" })),
  );
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [newRole, setNewRole] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRoleChange = (member: Member, role: string) => {
    setSelectedMember(member);
    setNewRole(role);
    setIsDialogOpen(true);
  };

  const confirmRoleChange = () => {
    if (selectedMember && newRole) {
      setIsDialogOpen(false);
      setMembers(
        members.map((member) =>
          member.id === selectedMember.id
            ? { ...member, role: newRole }
            : member,
        ),
      );
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={member.image ?? undefined}
                      alt={member.name ?? ""}
                    />
                    <AvatarFallback>
                      {member.name?.charAt(0) ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span>{member.name}</span>
                </div>
              </TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <Badge variant="secondary">{member.role}</Badge>
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
                    {member.phone && (
                      <DropdownMenuItem>
                        <Phone className="mr-2 h-4 w-4" />
                        <span>Call user</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <UserCog className="mr-2 h-4 w-4" />
                        <span>Change Role</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {roles.map((role) => (
                          <DropdownMenuItem
                            key={role}
                            onSelect={() => handleRoleChange(member, role)}
                          >
                            {role}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem>Remove from group</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to change {selectedMember?.name}&aops;s role
              to {newRole}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRoleChange}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MembersTable;
