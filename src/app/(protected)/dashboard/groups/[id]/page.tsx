import { School, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import InviteDialog from "./_components/InviteDialog";

async function getData(groupId: string) {
  return await db.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      members: true,
    },
  });
}

const GroupPage = async (props: {
  params: {
    id: string;
  };
}) => {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/auth/login");
  }

  const data = await getData(props.params.id);

  if (!data) {
    return redirect("/404");
  }

  // Checks if user is in the group, if not redirect them out
  if (!data.members.some((u) => u.id === user.id)) {
    return redirect("/404");
  }
  return (
    <div className="mt-8 flex flex-col px-10">
      <div>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src={data.logo ?? ""} />
              <AvatarFallback className="text-xl">
                {data.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <h1 className="flex items-center gap-2 text-base">
                <School className="size-4" /> South Lakes High School
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <InviteDialog
              joinCode={`${data.join_code.slice(0, 4)}-${data.join_code.slice(4, 8)}`}
            />
            <Button variant={"outline"} asChild>
              <Link href={`/dashboard/${data.id}/settings`}>
                <Settings className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </div>
    </div>
  );
};

export default GroupPage;
