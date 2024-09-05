"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { joinGroup } from "~/actions/dashboard/join-group";
import { ErrorComponent, SuccessComponent } from "~/components/forms/FormInfo";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type IJoinGroupCode, joinGroupSchema } from "~/lib/validation";
import { useGroupStore } from "~/stores/group-store";

const JoinGroup = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const addGroup = useGroupStore((state) => state.addGroup);

  const form = useForm<IJoinGroupCode>({
    resolver: zodResolver(joinGroupSchema),
    defaultValues: {
      joinCode: "",
    },
  });

  function onSubmit(values: IJoinGroupCode) {
    setError("");
    setSuccess("");

    startTransition(() => {
      joinGroup(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            return;
          }

          toast.success(`Successfully joined group ${data.group?.name}`, {
            position: "top-center",
            duration: 5000,
          });

          form.reset();
          setDialogOpen(false);

          if (data.group) addGroup(data.group);
        })
        .catch((e) => {
          setError("Something went wrong " + e);
        });
    });
  }

  useEffect(() => {
    if (!dialogOpen) {
      form.reset();
      setError("");
      setSuccess("");
    }
  }, [dialogOpen, form]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          Join Group
          <Plus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join group</DialogTitle>
          <DialogDescription>
            Enter the group code given to you by group owners/administrators
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="joinCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Join Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="xxxx-xxxx"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ErrorComponent message={error} />
            <SuccessComponent message={success} />
            <div className="flex items-center gap-2">
              <Button disabled={isPending} type="submit">
                Join Group
              </Button>
              <DialogClose asChild>
                <Button
                  disabled={isPending}
                  variant={"outline"}
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroup;
