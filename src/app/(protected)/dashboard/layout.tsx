import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";
import { toast } from "sonner";
import { GroupWithMembers } from "~/lib/types";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import Sidebar from "./_components/Sidebar";

async function getData(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      groups: {
        include: {
          members: true,
        },
      },
      ownedGroups: {
        include: {
          members: true,
        },
      },
    },
  });

  if (!user) {
    toast.error("Could not fetch user!");
    return null;
  }

  return [
    ...(user.groups || []),
    ...(user.ownedGroups ? [user.ownedGroups] : []),
  ];
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const validate = await validateRequest();

  if (validate instanceof NextResponse) {
    return validate;
  }

  const { user } = validate;

  if (!user) {
    redirect("/auth/login");
  }

  const data = await getData(user.id);

  return (
    <div className="flex min-h-screen ">
      <Sidebar groups={data as GroupWithMembers[]} />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
