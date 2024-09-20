"use client";

import { type Prisma } from "@prisma/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { MemberRow } from "./MemberRow";

const MembersTable = (props: {
  group: Prisma.GroupGetPayload<{
    include: {
      members: true;
    };
  }>;
}) => {
  return (
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
        {props.group.members.map((member) => (
          <MemberRow key={member.id} member={member} groupId={props.group.id} />
        ))}
      </TableBody>
    </Table>
  );
};

export default MembersTable;
