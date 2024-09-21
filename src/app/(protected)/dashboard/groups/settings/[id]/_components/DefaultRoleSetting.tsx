"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Role } from "@prisma/client";
import { useEffect, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { defaultRoleSchema, type IDefaultRole } from "~/lib/validation";
import { saveDefaultRole } from "../_actions/save-default-role";

type DefaultRoleSettingProps = {
    groupId: string;
    roles: Role[];
    defaultRoleId: string;
    focus?: boolean;
};

export default function DefaultRoleSetting({
    groupId,
    roles,
    defaultRoleId,
    focus = false,
}: DefaultRoleSettingProps) {
    const [isPending, startTransition] = useTransition();
    const selectRef = useRef<HTMLButtonElement>(null);

    const form = useForm<IDefaultRole>({
        resolver: zodResolver(defaultRoleSchema),
        defaultValues: {
            defaultRoleId,
        },
    });

    const defaultRoleIdValue: string = form.watch("defaultRoleId");

    const onSubmit = (data: IDefaultRole) => {
        startTransition(() =>
            saveDefaultRole(data, groupId)
                .then((data) => {
                    if (data?.error) {
                        toast.error("Could not change default role!", {
                            description: data.error,
                            position: "top-center",
                        });
                        return;
                    }

                    toast.success(data.success, {
                        position: "top-center",
                    });
                })
                .catch((error: Error) => {
                    console.error(error);
                    toast.error("Whoops, ran into an error!", {
                        description: error.message,
                        position: "top-center",
                    });
                }),
        );
    };

    useEffect(() => {
        if (focus && selectRef.current) {
            selectRef.current.focus();
            selectRef.current.click();
        }
    }, [focus]);

    return (
        <Card className="w-full">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle>Default Role</CardTitle>
                    <CardDescription>
                        Set the default role for new members joining the group.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        <Label htmlFor="defaultRole">Default Role</Label>
                        <Select
                            disabled={isPending}
                            onValueChange={(value) => form.setValue("defaultRoleId", value)}
                            defaultValue={defaultRoleIdValue}
                        >
                            <SelectTrigger className="w-full" ref={selectRef}>
                                <SelectValue placeholder="Select a default role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles
                                    .sort((a, b) => a.order - b.order)
                                    .map((role) => (
                                        <SelectItem key={role.id} value={role.id}>
                                            {role.name}
                                        </SelectItem>
                                    ))}
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
