import { redirect } from "next/navigation";
import Landing from "~/components/Landing";
import { validateRequest } from "~/server/auth";

const Page = async () => {
  const { session } = await validateRequest();

  if (session) {
    return redirect("/app");
  }
  return <Landing />;
};

export default Page;
