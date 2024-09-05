import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";
import { toast } from "sonner";
import { type GroupWithMembers } from "~/lib/types";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import Sidebar from "./_components/Sidebar";

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

  const dbUser = await db.user.findUnique({
    where: {
      id: user.id,
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

  if (!dbUser) {
    toast.error("Could not fetch user!");
    return null;
  }

  const thing = [
    ...(dbUser.groups || []),
    ...(dbUser.ownedGroups ? [dbUser.ownedGroups] : []),
  ];

  return (
    <div className="flex min-h-screen ">
      <Sidebar user={dbUser} groups={thing as GroupWithMembers[]} />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
