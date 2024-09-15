"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateUsername } from "~/actions/auth";
import FormCard from "~/components/forms/FormCard";
import { ErrorComponent, SuccessComponent } from "~/components/forms/FormInfo";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type IGoogleName, goolgeNameSchema } from "~/lib/validation";

const Google = () => {
  const searchParams = useSearchParams();
  const requiresName = searchParams.get("requiresName") === "true";
  const id = searchParams.get("id");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

  const router = useRouter();

  const form = useForm<IGoogleName>({
    resolver: zodResolver(goolgeNameSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    if (!requiresName || !id) {
      router.push("/dashboard");
    }
  }, [requiresName, id, router]);

  useEffect(() => {
    if (redirectCountdown !== null && redirectCountdown > 0) {
      const timer = setTimeout(() => setRedirectCountdown(redirectCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (redirectCountdown === 0) {
      router.push("/dashboard");
    }
  }, [redirectCountdown, router]);

  function onSubmit(values: IGoogleName) {
    if (!id) {
      setError("Id not provided");
      return;
    }

    setError("");
    setSuccess("");

    startTransition(() => {
      updateUsername(id, values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
            setRedirectCountdown(2);
          }
        })
        .catch(() => {
          form.reset();
          setError("Something went wrong");
        });
    });
  }

  if (!requiresName || !id) {
    return null;
  }

  return (
    <FormCard
      title={"One more thing..."}
      description={"Please set a username for your account"}
    >
      {!success ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              disabled={isPending}
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <div className="flex items-center">
                    <FormLabel htmlFor="username">Username</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      placeholder="Set username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2 space-y-2">
              <ErrorComponent message={error} />
              <Button type="submit" className="w-full" disabled={isPending}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <>
          <SuccessComponent message={success} />
          <div className="mt-4 flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Redirecting in {redirectCountdown} seconds...</span>
          </div>
        </>
      )}
    </FormCard>
  );
};

export default Google;
