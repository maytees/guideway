"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createPost } from "~/actions/dashboard/create-post";
import { ErrorComponent } from "~/components/forms/FormInfo";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { type GroupWithMembersAndPosts, type Tag } from "~/lib/types";
import { type IPost, postSchema } from "~/lib/validation";
import { usePostStore } from "~/stores/post-store";
import AdditionalSettings from "./TagsSetting";

const CreatePostButton = (props: { group: GroupWithMembersAndPosts }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [tags, setTags] = useState<Tag[]>([]);
  const { addPost } = usePostStore();

  const form = useForm<IPost>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      isPinned: false,
    },
  });

  const onSubmit = async (values: IPost) => {
    setError("");

    startTransition(() => {
      createPost(values, tags, props.group.id)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            return;
          }

          toast.success(`Successfully created post!`, {
            position: "top-center",
            duration: 5000,
          });

          form.reset();
          setOpen(false);

          addPost(data.post!);
        })
        .catch((e) => {
          setError("Something went wrong: " + e);
        });
    });
  };

  useEffect(() => {
    if (!open) {
      form.reset();
      setTags([]);
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Create a new post for your group. Fill out the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter post title"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter post content"
                      className="h-32"
                      maxLength={2500}
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription
                    className={`${field.value.length == 2500 && "text-destructive"}`}
                  >
                    {field.value.length}/2500
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPinned"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Pin</FormLabel>
                    <FormDescription>
                      This post will be pinned at the top of the posts list.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <AdditionalSettings
              tags={tags}
              setTags={setTags}
              isPending={isPending}
            />
            <ErrorComponent message={error} />
            <div className="flex w-full flex-row items-center justify-between">
              <DialogClose asChild>
                <Button variant={"outline"} disabled={isPending}>
                  Save draft
                </Button>
              </DialogClose>
              <div className="flex w-full flex-row-reverse items-center gap-2">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating..." : "Create Post"}
                </Button>
                <DialogClose asChild>
                  <Button variant={"outline"} disabled={isPending}>
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostButton;
