"use client";
import { type Prisma } from "@prisma/client";
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
import { saveTheme } from "./_actions/save-theme";

export default function ThemeSetting({
  data,
}: {
  data: Prisma.UserGetPayload<{
    select: { id: true; colorScheme: true };
  }>;
}) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(() =>
      saveTheme(formData, data.id)
        .then(() => {
          // You might want to add some success handling here
        })
        .catch((error) => {
          console.error(error);
          // You might want to add some error handling here
        }),
    );
  };

  return (
    <Card className="w-full">
      <form action={handleSubmit}>
        <CardHeader>
          <CardTitle>Color Theme</CardTitle>
          <CardDescription>
            Configure what color scheme you&apos;d like to use.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <Label>Color Scheme</Label>
            <Select
              disabled={isPending}
              name="color"
              defaultValue={data.colorScheme}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Color</SelectLabel>
                  <SelectItem value="theme-zinc">Black</SelectItem>
                  <SelectItem value="theme-green">Green</SelectItem>
                  <SelectItem value="theme-blue">Blue</SelectItem>
                  <SelectItem value="theme-violet">Violet</SelectItem>
                  <SelectItem value="theme-yellow">Yellow</SelectItem>
                  <SelectItem value="theme-orange">Orange</SelectItem>
                  <SelectItem value="theme-red">Red</SelectItem>
                  <SelectItem value="theme-rose">Rose</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={isPending}>
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
