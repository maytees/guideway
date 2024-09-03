"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

const JoinGroup = (props: { size?: "lg" | undefined }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const form = useForm<IJoinGroupCode>({
    resolver: zodResolver(joinGroupSchema),
    defaultValues: {
      joinCode: "",
    },
  });

  function onSubmit(values: IJoinGroupCode) {
    // TODO: Implement backend via server action
  }

  useEffect(() => {
    if (!dialogOpen) {
      form.reset();
    }
  }, [dialogOpen, form]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size={props.size} className="gap-2">
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="joinCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Join Code</FormLabel>
                  <FormControl>
                    <Input placeholder="xxxx-xxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 flex items-center gap-2">
              <Button type="submit">Join Group</Button>
              <DialogClose asChild>
                <Button variant={"outline"} onClick={() => form.reset()}>
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
