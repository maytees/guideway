"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { resetPassword } from "~/actions/auth";
import FormCard from "~/components/forms/FormCard";
import { ErrorComponent, SuccessComponent } from "~/components/forms/FormInfo";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type IPasswordReset, passwordResetSchema } from "~/lib/validation";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<IPasswordReset>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  function onSubmit(values: IPasswordReset) {
    setError("");
    setSuccess("");

    if (!token) {
      setError("Missing token!");
      return;
    }

    startTransition(() => {
      resetPassword(token, values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);

          if (data?.success) {
            form.reset();
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  }

  return (
    <FormCard
      title="Start new"
      description={success ? "Password reset!" : "Reset your password"}
    >
      {!success ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <FormField
                control={form.control}
                name="newPassword"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="" />
                    </FormControl>
                    <FormDescription className="text-left">
                      Enter your new password
                    </FormDescription>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="" />
                    </FormControl>
                    <FormDescription className="text-left">
                      Confirm your password
                    </FormDescription>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />
              <ErrorComponent message={error} />
              {/* <SuccessComponent message={success} /> */}
              <Button
                disabled={isPending}
                type="submit"
                variant="default"
                className="mt-5 w-full"
              >
                Reset password
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <div className="w-full">
          <SuccessComponent message={success} />
          <Button
            variant="default"
            className="mt-5 w-full"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
        </div>
      )}
    </FormCard>
  );
};

export default ResetPasswordPage;
