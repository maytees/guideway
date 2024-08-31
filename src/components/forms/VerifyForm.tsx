"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { verifyUser } from "~/actions/auth";
import { Button } from "../ui/button";
import FormCard from "./FormCard";
import { ErrorComponent, SuccessComponent } from "./FormInfo";

const VerifyForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    verifyUser(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <FormCard
      title={"Welcome back"}
      description={!success ? "Verifying your email" : "You're all set!"}
    >
      {!success && !error && (
        <HashLoader
          color="#00000"
          className="mx-auto w-full animate-pulse"
          speedMultiplier={1.5}
        />
      )}
      <ErrorComponent message={error} />
      <SuccessComponent message={success} />
      <Button
        variant="default"
        className="w-full"
        onClick={() => router.push("/dashboard")}
      >
        Go home
      </Button>
    </FormCard>
  );
};

export default VerifyForm;
