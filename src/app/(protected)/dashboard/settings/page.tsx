import { unstable_noStore as noStore } from "next/cache";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import Darkmode from "./components/appearance/Darkmode";
import FontSetting from "./components/appearance/Font";
import ThemeSetting from "./components/appearance/Theme";

async function getData(userId: string | undefined) {
  noStore();
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      font: true,
      id: true,
      colorScheme: true,
    },
  });

  return data;
}

const SettingsPage = async () => {
  const { user } = await validateRequest();
  const data = await getData(user?.id);

  return (
    <div className="mt-10 px-2 max-md:mt-20 md:px-3 2xl:px-20">
      <div className="3xl:gap-10 flex w-full flex-col sm:flex-row sm:items-center sm:justify-between lg:justify-start lg:gap-5">
        <h1 className="mb-2 text-2xl font-semibold sm:mb-0 sm:text-2xl lg:text-3xl">
          Settings
        </h1>
      </div>
      <Tabs defaultValue="general" className="w-full  lg:mt-5 ">
        <TabsList className="mb-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="general"></TabsContent>
        <TabsContent value="privacy"></TabsContent>
        <TabsContent value="billing"></TabsContent>
        <TabsContent value="appearance" className="mt-5">
          <div className="flex flex-col gap-5 ">
            <Darkmode />
            <ThemeSetting data={data ?? { id: '', colorScheme: '' }} />
            <FontSetting data={data ?? { id: '', font: '', colorScheme: '' }} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
