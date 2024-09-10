import { redirect } from "next/navigation";
import { validateRequest } from "~/server/auth";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/");
  }

  if (user.name) {
    return redirect("/dashboard");
  }

  return <>{children}</>;
}
