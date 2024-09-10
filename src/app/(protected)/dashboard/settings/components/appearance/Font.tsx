"use client";
import { type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { useTransition } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { saveFont } from "./_actions/save-font";

export default function FontSetting({
  data,
}: {
  data: Prisma.UserGetPayload<{
    select: { id: true; font: true; colorScheme: true };
  }>;
}) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(() =>
      saveFont(formData, data.id)
        .then(() => {
          revalidatePath("/", "layout");
        })
        .catch((error) => {
          console.error(error);
        }),
    );
  };

  return (
    <Card className="w-full">
      <form action={handleSubmit}>
        <CardHeader>
          <CardTitle>Font</CardTitle>
          <CardDescription>
            Configure what font type you&apos;d like to use.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <Label>Font</Label>
            <Select name="font" defaultValue={data.font}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Font</SelectLabel>
                  <SelectItem value="font-mono">Mono</SelectItem>
                  <SelectItem value="font-normal">Normal</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
