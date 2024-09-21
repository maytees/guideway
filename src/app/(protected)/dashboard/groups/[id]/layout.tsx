import { redirect } from "next/navigation";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

async function getData(groupId: string, userId: string) {
  return {
    data: await db.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: true,
      },
    }),
    user: await db.user.findUnique({
      where: {
        id: userId,
      },
    }),
  };
}

export default async function DashboardLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/auth/login");
  }

  const { data, user: currentUser } = await getData(params.id, user.id);

  if (!data || !currentUser) {
    return redirect("/404");
  }

  // Checks if user is in the group, if not redirect them out
  if (!data.members.some((u) => u.id === user.id)) {
    return redirect("/404");
  }
  return <section>{children}</section>;
}
