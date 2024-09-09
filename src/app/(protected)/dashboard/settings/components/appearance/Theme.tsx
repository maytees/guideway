import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

async function getData(userId: string | undefined) {
  noStore();
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      colorScheme: true,
    },
  });

  return data;
}

export default async function ThemeSetting() {
  const { user } = await validateRequest();
  const data = await getData(user?.id);

  if (!data) {
    return redirect("/auth/login");
  }

  async function postData(formData: FormData) {
    "use server";

    const colorScheme = formData.get("color") as string;

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        colorScheme: colorScheme ?? undefined,
      },
    });

    revalidatePath("/", "layout");
  }

  return (
    <Card className="w-full">
      <form action={postData}>
        <CardHeader>
          <CardTitle>Color Theme</CardTitle>
          <CardDescription>
            Configure what color scheme you&apos;d like to use.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <Label>Color Scheme</Label>
            <Select name="color" defaultValue={data.colorScheme}>
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
          <Button type="submit">Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
