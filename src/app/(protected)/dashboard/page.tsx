import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { toast } from "sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { GroupWithMembers } from "~/lib/types";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import AllGroups from "./_components/AllGroups";
import CreateGroup from "./_components/CreateGroup";
import JoinGroup from "./_components/JoinGroup";

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

const Page = async () => {
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
    <TooltipProvider>
      <div className="mt-10 px-2 md:px-3 2xl:px-40 max-sm:mt-20">
        {/* <h1>Welcome, {user.name}</h1>
      <form action={signout}>
        <button type="submit">Log out</button>
      </form> */}
        <div className="flex flex-col w-full sm:flex-row sm:items-center sm:justify-between lg:justify-start lg:gap-5 3xl:gap-10">
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-0">Group explorer</h1>
          <div className="flex gap-2 3xl:gap-4">
            <JoinGroup />
            <CreateGroup />
          </div>
        </div>
        <div className="mr-4 flex-1">
          <AllGroups groups={data as GroupWithMembers[]} />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Page;
