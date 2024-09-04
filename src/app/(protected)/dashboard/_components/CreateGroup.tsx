"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createGroup } from "~/actions/dashboard/create-group";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { createGroupSchema, type ICreateGroup } from "~/lib/validation";
import { useGroupStore } from "~/stores/group-store";

const CreateGroup = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const addGroup = useGroupStore((state) => state.addGroup);

  const form = useForm<ICreateGroup>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      category: "ACADEMIC",
      description: "",
    },
  });

  function onSubmit(values: ICreateGroup) {
    setError("");
    setSuccess("");

    startTransition(() => {
      createGroup(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            return;
          }

          toast.success(`Successfully created group ${values.name}`, {
            position: "top-center",
            description: `Join code: ${data.group?.join_code}`,
            duration: 5000,
          });
          form.reset();
          setDialogOpen(false);

          if (data.group) addGroup(data.group);
        })
        .catch((e) => {
          setError("Something went wrong: " + e);
        });
    });
  }

  useEffect(() => {
    if (!dialogOpen) {
      form.reset();
    }
  }, [dialogOpen, form]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant={"outline"} className="gap-2">
          Create Group
          <Plus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create group</DialogTitle>
          <DialogDescription>
            Fill out the information below to create a new group.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Enter group name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Category</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose Club Cateegory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACADEMIC">Academic</SelectItem>
                      <SelectItem value="ARTS_AND_CULTURE">
                        Arts and Culture
                      </SelectItem>
                      <SelectItem value="BUSINESS_AND_ENTREPRENEURSHIP">
                        Business and Entrepreneurship
                      </SelectItem>
                      <SelectItem value="COMMUNITY_SERVICE_AND_VOLUNTEERING">
                        Community Service and Volunteering
                      </SelectItem>
                      <SelectItem value="ENVIRONMENTAL_AND_SUSTAINABILITY">
                        Environmental and Sustainability
                      </SelectItem>
                      <SelectItem value="HEALTH_AND_WELLNESS">
                        Health and Wellness
                      </SelectItem>
                      <SelectItem value="HOBBIES_AND_INTERESTS">
                        Hobbies and Interests
                      </SelectItem>
                      <SelectItem value="IDENTITY_AND_DIVERSITY">
                        Identity and Diversity
                      </SelectItem>
                      <SelectItem value="MEDIA_AND_JOURNALISM">
                        Media and Journalism
                      </SelectItem>
                      <SelectItem value="POLITICAL_AND_ACTIVISM">
                        Political and Activism
                      </SelectItem>
                      <SelectItem value="RELIGIOUS_AND_SPIRITUAL">
                        Religious and Spiritual
                      </SelectItem>
                      <SelectItem value="SOCIAL_AND_NETWORKING">
                        Social and Networking
                      </SelectItem>
                      <SelectItem value="SPORTS_AND_RECREATION">
                        Sports and Recreation
                      </SelectItem>
                      <SelectItem value="TECHNOLOGY_AND_INNOVATION">
                        Technology and Innovation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      className="h-32"
                      placeholder="Provide a description for your group"
                      maxLength={256}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription
                    className={`${field.value.length == 256 && "text-destructive"}`}
                  >
                    {field.value.length}/256
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ErrorComponent message={error} />
            <SuccessComponent message={success} />
            <div className="mt-20 flex items-center gap-2">
              <Button type="submit" disabled={isPending}>
                Create Group
              </Button>
              <DialogClose asChild>
                <Button
                  variant={"outline"}
                  disabled={isPending}
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

export default CreateGroup;
