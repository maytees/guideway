"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import FormCard from "~/components/forms/FormCard";
import { Button } from "~/components/ui/button";

// Returns JSX page of error
const getErrorPage = (code: string | null): React.ReactNode | null => {
  switch (code) {
    case "409":
      return null;
    case "410":
      return VerifyEmail();
    default:
      return null;
  }
};

const VerifyEmail = () => {
  return <div>Email needs verifying</div>;
};

const Error = () => {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("code");

  const router = useRouter();

  const error = getErrorPage(errorCode);

  if (error) {
    return error;
  }

  return (
    <FormCard title={"Oops.."} description={"Something went wrong.."}>
      <div className="mt-2 space-y-2">
        <Button
          type="submit"
          className="w-full"
          onClick={() => {
            router.push("/auth/register");
          }}
        >
          Back to register
        </Button>
      </div>
    </FormCard>
  );
};

export default Error;
