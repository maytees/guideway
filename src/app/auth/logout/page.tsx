import Link from "next/link";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { signout } from "~/actions/auth";
import FormCard from "~/components/forms/FormCard";
import { Button } from "~/components/ui/button";
import { validateRequest } from "~/server/auth";

const LogoutPage = async () => {
  const validate = await validateRequest();

  if (validate instanceof NextResponse) {
    return validate;
  }

  const { user } = validate;

  if (!user) {
    redirect("/");
  }

  return (
    <FormCard
      title={"Sad to see you leave.."}
      description={"Press the button below to log out."}
    >
      <form action={signout} className="space-y-3">
        <Button className="w-full" variant={"outline"} asChild>
          <Link href="/dashboard">Take me back</Link>
        </Button>
        <Button className="w-full" type="submit">
          Log out
        </Button>
      </form>
    </FormCard>
  );
};

export default LogoutPage;
