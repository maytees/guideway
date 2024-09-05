"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "~/actions/auth";
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
import { forgotPasswordSchema, type IForgotPassword } from "~/lib/validation";
import { Input } from "~/components/ui/input";

const ForgotPasswordPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<IForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: IForgotPassword) {
    setError("");
    setSuccess("");
    startTransition(() => {
      forgotPassword(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  }
  return (
    <FormCard
      title="Start new"
      description={success ? "Check your email" : "Send a password reset link"}
    >
      {!success ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isPending}
                        placeholder="example@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your email</FormDescription>
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
                className="mt-3 w-full"
              >
                Send reset link
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <EmailNotif message={success} email={form.getValues("email")} />
      )}
    </FormCard>
  );
};

function EmailNotif({
  message,
  email,
}: {
  message: string | undefined;
  email: string;
}) {
  return (
    <div className="flex flex-col justify-center space-y-2">
      <SuccessComponent message={message} />
      <h1 className="ml-2 text-xs font-normal">
        We sent a reset link to <span className="font-bold">{email}</span>
      </h1>
    </div>
  );
}

export default ForgotPasswordPage;
