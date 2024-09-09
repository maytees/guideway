import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Darkmode from "./components/appearance/Darkmode";
import ThemeSetting from "./components/appearance/Theme";

const SettingsPage = () => {
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
            <ThemeSetting />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
