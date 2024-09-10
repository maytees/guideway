"use client";
import { type Prisma } from "@prisma/client";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { revalidatePath } from "next/cache";
import { useState, useTransition } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { saveColorMode } from "./_actions/save-color-mode";

const Darkmode = ({
  data,
}: {
  data: Prisma.UserGetPayload<{
    select: { id: true; font: true; colorScheme: true; colorMode: true };
  }>;
}) => {
  const { theme, setTheme } = useTheme();
  const [colorMode, setColorMode] = useState(theme);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(() =>
      saveColorMode(colorMode ?? "light", data.id)
        .then(() => {
          setTheme(colorMode!);
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
          <CardTitle>Color mode</CardTitle>
          <CardDescription>
            Choose whether you&apos;d like light or dark mode.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Sun className="size-5 dark:hidden" />
                <Moon className="hidden size-5 dark:inline-block" />
                <span>
                  {theme
                    ? theme.charAt(0).toUpperCase() + theme.slice(1)
                    : "System"}
                </span>
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setColorMode("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setColorMode("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setColorMode("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Darkmode;
