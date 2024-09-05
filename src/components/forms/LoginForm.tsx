"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { login } from "~/actions/auth";
import { type ILogin, loginSchema } from "~/lib/validation";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import FormCard from "./FormCard";
import { ErrorComponent } from "./FormInfo";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: ILogin) {
    setError("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            router.push("/dashboard");
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  }

  return (
    <FormCard title={"Welcome back"} description={"Please sign in"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            disabled={isPending}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={isPending}
                    placeholder="example@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isPending}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-3">
                <div className="flex items-center">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    disabled={isPending}
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-5 space-y-2">
            <ErrorComponent message={error} />
            <Button className="w-full" disabled={isPending} type="submit">
              Log in
            </Button>
            <p className="w-full pt-2 text-center text-xs font-thin">OR</p>
          </div>
        </form>
        <Button
          className="w-full gap-x-2"
          disabled={isPending}
          variant={"outline"}
          onClick={() => {
            router.push("/auth/google");
          }}
        >
          <FaGoogle size={15} />
          <span>Log in with Google</span>
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link href="/auth/register" className="ml-1 underline">
            Register
          </Link>
        </div>
      </Form>
    </FormCard>
  );
};

export default LoginForm;
