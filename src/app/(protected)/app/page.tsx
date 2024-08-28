import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";
import { validateRequest } from "~/server/auth";
import { signout } from "~/actions/auth";

const Page = async () => {
  const validate = await validateRequest();

  if (validate instanceof NextResponse) {
    return validate;
  }

  const { user } = validate;

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <form action={signout}>
        <button type="submit">Log out</button>
      </form>
    </div>
  );
};

export default Page;
