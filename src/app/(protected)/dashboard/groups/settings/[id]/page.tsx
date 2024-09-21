import { ArrowLeft } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { db } from "~/server/db";
import DefaultRoleSetting from "./_components/DefaultRoleSetting";
import MembersTable from "./_components/MembersTable";
import RolesTable from "./_components/RolesAndPermissions";

// Gets group
async function getData(groupId: string | undefined) {
  noStore();
  const data = await db.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      members: true,
      roles: {
        include: {
          users: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return data;
}

const SettingsPage = async (props: { params: { id: string }, searchParams: { tab?: string, focus?: string } }) => {
  const data = await getData(props.params.id);

  if (!data) {
    return redirect("/404");
  }

  const defaultRole = data.roles.find((role) => role.isDefault);
  const defaultTab = props.searchParams.tab ?? "general";
  const focusDefaultRole = props.searchParams.focus === "defaultRole";


  return (
    <div className="mt-10 px-2 max-md:mt-20 md:px-3 2xl:px-20">
      <div className="mb-4 flex items-center gap-4">
        <Link href={`/dashboard/groups/${props.params.id}`}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-semibold sm:text-2xl lg:text-3xl">
          Settings
        </h1>
      </div>
      <Tabs defaultValue={defaultTab} className="w-full lg:mt-5 ">
        <TabsList className="mb-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <div className="flex flex-col gap-5">
            <DefaultRoleSetting
              groupId={data.id}
              roles={data.roles}
              defaultRoleId={defaultRole?.id ?? ""}
              focus={focusDefaultRole}
            />
          </div>
        </TabsContent>
        <TabsContent value="roles">
          <RolesTable group={data} />
        </TabsContent>
        <TabsContent value="members">
          <div className="flex flex-col gap-5">
            <MembersTable group={data} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
