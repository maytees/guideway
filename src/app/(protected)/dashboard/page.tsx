import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { toast } from "sonner";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import AllGroups from "./_components/AllGroups";
import JoinGroup from "./_components/JoinGroup";

async function getData(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      groups: true,
      ownedGroups: true,
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
    <div className="mt-20 px-10 md:px-20 lg:px-40 2xl:px-80">
      {/* <h1>Welcome, {user.name}</h1>
      <form action={signout}>
        <button type="submit">Log out</button>
      </form> */}
      <div className="flex flex-row items-center gap-5">
        <h1 className="text-3xl font-semibold">Group explorer</h1>
        <JoinGroup />
      </div>
      <div className="mr-4 flex-1">
        <AllGroups groups={data!} />
      </div>
    </div>
  );
};

export default Page;
