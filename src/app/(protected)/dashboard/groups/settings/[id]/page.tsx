import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { db } from "~/server/db";
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
      },
    },
  });

  return data;
}

const SettingsPage = async (props: { params: { id: string } }) => {
  const data = await getData(props.params.id);

  if (!data) {
    return redirect("/404");
  }

  return (
    <div className="mt-10 px-2 max-md:mt-20 md:px-3 2xl:px-20">
      <div className="3xl:gap-10 flex w-full flex-col sm:flex-row sm:items-center sm:justify-between lg:justify-start lg:gap-5">
        <h1 className="mb-2 text-2xl font-semibold sm:mb-0 sm:text-2xl lg:text-3xl">
          Settings
        </h1>
      </div>
      <Tabs defaultValue="roles" className="w-full lg:mt-5 ">
        <TabsList className="mb-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        <TabsContent value="general"></TabsContent>
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
