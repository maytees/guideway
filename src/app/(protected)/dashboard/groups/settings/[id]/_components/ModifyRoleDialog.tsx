"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateRole } from "~/actions/dashboard/group/settings/update-role";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { colors } from "~/lib/utils";
import { type IRoleName, roleNameSchema } from "~/lib/validation";

interface ModifyRoleDialogProps {
    isOpen: boolean;
    onClose: () => void;
    role: {
        id: string;
        name: string;
        color: string;
    };
    groupId: string;
}

export function ModifyRoleDialog({ isOpen, onClose, role, groupId }: ModifyRoleDialogProps) {
    const [selectedColor, setSelectedColor] = useState(role.color);
    const [isPending, startTransition] = useState(false);

    const form = useForm<IRoleName>({
        resolver: zodResolver(roleNameSchema),
        defaultValues: {
            name: role.name,
        },
    });

    const handleUpdateRole = (values: IRoleName) => {
        startTransition(true);
        updateRole(role.id, groupId, values.name, selectedColor)
            .then((data) => {
                if (data.error) {
                    toast.error(data.error, { position: "top-center" });
                } else {
                    toast.success(data.success, { position: "top-center" });
                    onClose();
                }
            })
            .catch((error: Error) => {
                toast.error("An error occurred while updating the role!", {
                    description: error.message,
                    position: "top-center"
                });
            })
            .finally(() => {
                startTransition(false);
            });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modify Role</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleUpdateRole)}>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <span className="font-bold">Preview</span>
                                <span
                                    className="w-fit rounded px-2 py-1 text-xs font-semibold"
                                    style={{
                                        backgroundColor: selectedColor,
                                        color: colors.find((c) => c.bg === selectedColor)?.text,
                                    }}
                                >
                                    {form.watch("name") || role.name}
                                </span>
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <Label>Color</Label>
                                <RadioGroup
                                    disabled={isPending}
                                    defaultValue={role.color}
                                    onValueChange={setSelectedColor}
                                    className="grid grid-cols-11 gap-2 mt-2"
                                >
                                    {colors.map((color) => (
                                        <div key={color.bg}>
                                            <RadioGroupItem
                                                value={color.bg}
                                                id={color.bg}
                                                className="peer sr-only"
                                                disabled={isPending}
                                            />
                                            <Label
                                                htmlFor={color.bg}
                                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-transparent peer-data-[state=checked]:border-black dark:peer-data-[state=checked]:border-primary"
                                                style={{ backgroundColor: color.bg }}
                                            >
                                                <span className="sr-only">{color.bg}</span>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                Update Role
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}