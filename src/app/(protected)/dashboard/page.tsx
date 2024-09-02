import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { toast } from "sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { type GroupWithMembers } from "~/lib/types";
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
      <div className="mt-10 px-2 max-md:mt-20 md:px-3 2xl:px-40">
        {/* <h1>Welcome, {user.name}</h1>
      <form action={signout}>
        <button type="submit">Log out</button>
      </form> */}
        <div className="3xl:gap-10 flex w-full flex-col sm:flex-row sm:items-center sm:justify-between lg:justify-start lg:gap-5">
          <h1 className="mb-2 text-2xl font-semibold sm:mb-0 sm:text-2xl lg:text-3xl">
            Group explorer
          </h1>
          <div className="3xl:gap-4 flex gap-2">
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
