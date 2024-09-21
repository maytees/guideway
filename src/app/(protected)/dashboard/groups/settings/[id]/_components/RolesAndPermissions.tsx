"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Prisma } from "@prisma/client";
import { MoreHorizontal, Pen, Plus, Shield, Trash, Users } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createRole } from "~/actions/dashboard/group/settings/create-role";
import { deleteRole } from "~/actions/dashboard/group/settings/delete-role";
import { updateRoles } from "~/actions/dashboard/group/settings/update-roles";
import { ErrorComponent } from "~/components/forms/FormInfo";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { colors, DEFAULT_COLOR } from "~/lib/utils";
import { type IRoleName, roleNameSchema } from "~/lib/validation";
import { ModifyRoleDialog } from "./ModifyRoleDialog";

type Permission = {
  id: string;
  name: string;
  description: string;
};

const allPermissions: Permission[] = [
  {
    id: "manage_users",
    name: "Manage Users",
    description: "Can add, remove, and edit users",
  },
  {
    id: "manage_roles",
    name: "Manage Roles",
    description: "Can create, delete, and modify roles",
  },
  {
    id: "manage_content",
    name: "Manage Content",
    description: "Can create, edit, and delete content",
  },
  {
    id: "view_analytics",
    name: "View Analytics",
    description: "Can view site analytics and reports",
  },
];

export default function RolesTable(props: {
  group: Prisma.GroupGetPayload<{
    include: {
      members: true;
      roles: {
        include: {
          users: true;
        };
      };
    };
  }>;
}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeletingDialogOpen, setIsDeletingDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [countdown, setCountdown] = useState(3);
  const [roles, setRoles] = useState(
    props.group.roles.sort((a, b) => a.order - b.order),
  );
  const [modifyingRole, setModifyingRole] = useState<{
    id: string;
    name: string;
    color: string;
  } | null>(null);

  const form = useForm<IRoleName>({
    resolver: zodResolver(roleNameSchema),
    defaultValues: {
      name: "",
    },
  });

  const newRoleName = form.watch("name");

  const handleCreateRole = (values: IRoleName) => {
    setError("");

    startTransition(() => {
      createRole(
        values,
        props.group.id,
        [],
        [],
        selectedColor?.bg ?? DEFAULT_COLOR,
      )
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            return;
          }

          toast.success(data.success, {
            position: "top-center",
            duration: 5000,
          });

          form.reset();
          setIsCreateDialogOpen(false);
        })
        .catch((e) => setError("There was an error: " + e));
    });
  };

  const handleSaveOrder = (newOrders: Record<number, number>) => {
    startTransition(() => {
      updateRoles(props.group.id, newOrders)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            return;
          }

          if (data.roles) {
            setRoles(data.roles);
          }

          toast.success("Success!", {
            duration: 5000,
            description: "Successfully changed order of roles",
            position: "top-center",
          });
        })
        .catch((e) => {
          toast.error("Could not reorder roles: " + e);
        });
    });
  };

  // const handleToggleUser = (roleId: string, user: string) => {
  //   // Call server action (toggle user in role)
  // };

  // const handleTogglePermission = (roleId: string, permissionId: string) => {
  //   // Call server action (toggle permission in role)
  // };

  const handleDeleteRole = (roleId: string, roleName: string) => {
    setIsDeletingDialogOpen(false);
    startTransition(() => {
      deleteRole(roleId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            return;
          }
          toast.success("Success!", {
            duration: 5000,
            description: "Successfully deleted role: " + roleName,
            position: "top-center",
          });
        })
        .catch((e) => {
          toast.error("Could not delete role: " + e);
        });
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(roles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem!);

    const newRoleOrders: Record<number, number> = {};
    items.forEach((role, newIndex) => {
      if (role.order !== newIndex + 1) {
        newRoleOrders[role.order] = newIndex + 1;
      }
    });

    setRoles(items);

    if (Object.keys(newRoleOrders).length > 0) {
      handleSaveOrder(newRoleOrders);
    }
  };

  useEffect(() => {
    if (!isCreateDialogOpen) {
      setSelectedColor(colors[0]);
      form.reset();
    }
  }, [form, isCreateDialogOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDeletingDialogOpen && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isDeletingDialogOpen, countdown]);

  useEffect(() => {
    const initialRoleOrders: Record<string, number> = {};
    roles.forEach((role, index) => {
      initialRoleOrders[role.id] = role.order || index + 1;
    });
  }, [roles]);

  useEffect(() => {
    setRoles(props.group.roles);
  }, [props.group.roles]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <Plus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>
                To create a new role, please enter in the name, select a color
                for the role, and select permissions.
              </DialogDescription>
            </DialogHeader>
            {selectedColor && (
              <div className="flex flex-col gap-2">
                <span className="font-bold">Preview</span>
                <span
                  className="w-fit rounded px-2 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: selectedColor.bg,
                    color: selectedColor.text,
                  }}
                >
                  {newRoleName === "" ? "Enter Role Name" : newRoleName}
                </span>
              </div>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateRole)}>
                <div className="grid gap-4 py-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            {...field}
                            className="col-span-3"
                            placeholder="Officer"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <RadioGroup
                    disabled={isPending}
                    defaultValue={colors[0]?.bg}
                    onValueChange={(value) =>
                      setSelectedColor(colors.find((c) => c.bg === value))
                    }
                    className="grid grid-cols-11 gap-2"
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
                <div className="mt-2 space-y-3">
                  <ErrorComponent message={error} />
                  <Button className="mt-2" type="submit" disabled={isPending}>
                    Create Role
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-shrink flex-row justify-end">
        <DragDropContext onDragEnd={onDragEnd}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Badge Preview</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <Droppable droppableId="roles">
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {roles.map((role, index) => (
                    <Draggable
                      key={role.id}
                      draggableId={role.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? "bg-muted" : ""}
                        >
                          <TableCell className="font-medium">
                            {role.name}
                          </TableCell>
                          <TableCell>
                            <span
                              className="w-fit rounded px-2 py-1 text-xs font-semibold"
                              style={{
                                backgroundColor: role.color,
                                color: colors.find((c) => c.bg === role.color)
                                  ?.text,
                              }}
                            >
                              {role.name}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">
                                  <Users className="mr-2 h-4 w-4" />
                                  Users ({role.users.length})
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>
                                    Manage Users for {role.name}
                                  </DialogTitle>
                                </DialogHeader>
                                <ScrollArea className="h-[200px] w-full rounded-md border p-4"></ScrollArea>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">
                                  <Shield className="mr-2 h-4 w-4" />
                                  Permissions ({role.permissions.length})
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Manage Permissions for {role.name}
                                  </DialogTitle>
                                </DialogHeader>
                                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                  {allPermissions.map((permission) => (
                                    <div
                                      key={permission.id}
                                      className="mb-4 flex flex-col space-y-1"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`${role.id}-${permission.id}`}
                                          checked={role.permissions.includes(
                                            permission.id,
                                          )}
                                        // onCheckedChange={() =>
                                        //   handleTogglePermission(
                                        //     role.id,
                                        //     permission.id,
                                        //   )
                                        // }
                                        />
                                        <label
                                          htmlFor={`${role.id}-${permission.id}`}
                                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                          {permission.name}
                                        </label>
                                      </div>
                                      <p className="ml-6 text-sm text-gray-500">
                                        {permission.description}
                                      </p>
                                    </div>
                                  ))}
                                </ScrollArea>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu modal={false}>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                  {role.name}
                                </DropdownMenuLabel>
                                <DropdownMenuItem onSelect={() => setModifyingRole(role)}>
                                  <Pen className="mr-2 h-4 w-4" />
                                  <span>Modify</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <Dialog
                                  open={isDeletingDialogOpen}
                                  onOpenChange={(open) => {
                                    setIsDeletingDialogOpen(open);
                                    if (open) setCountdown(3);
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => {
                                        e.preventDefault();
                                        setIsDeletingDialogOpen(true);
                                      }}
                                      className="text-destructive hover:text-destructive focus:text-destructive"
                                    >
                                      <Trash className="mr-2 h-4 w-4" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle className="text-destructive">
                                        {role.isDefault ? "Cannot Delete Default Role" : "Confirm Deletion"}
                                      </DialogTitle>
                                      <DialogDescription>
                                        {role.isDefault
                                          ? "You cannot delete the default role. Please go to the General tab to change the default role first."
                                          : "Are you sure you want to delete this role? This action is irreversible."}
                                      </DialogDescription>
                                    </DialogHeader>
                                    {role.isDefault ? (
                                      <DialogFooter className="flex justify-end">
                                        <Button
                                          variant="outline"
                                          onClick={() => setIsDeletingDialogOpen(false)}
                                        >
                                          Close
                                        </Button>
                                      </DialogFooter>
                                    ) : (
                                      <DialogFooter className="flex flex-col items-center sm:flex-row sm:justify-between">
                                        <div className="mb-4 text-sm font-medium sm:mb-0">
                                          {countdown > 0
                                            ? `Please wait ${countdown} seconds`
                                            : "You can now delete"}
                                        </div>
                                        <div className="flex gap-2">
                                          <Button
                                            variant="outline"
                                            onClick={() =>
                                              setIsDeletingDialogOpen(false)
                                            }
                                            disabled={isPending}
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            variant="destructive"
                                            onClick={() => {
                                              handleDeleteRole(
                                                role.id,
                                                role.name,
                                              );
                                            }}
                                            disabled={countdown > 0 || isPending}
                                            className="relative"
                                          >
                                            {countdown > 0 && (
                                              <div className="absolute inset-0 flex items-center justify-center rounded-md bg-destructive/20">
                                                <div
                                                  className="h-full w-full animate-pulse rounded-md bg-destructive/40"
                                                  style={{
                                                    animationDuration: `${countdown}s`,
                                                    animationIterationCount: "1",
                                                  }}
                                                />
                                              </div>
                                            )}
                                            Delete
                                          </Button>
                                        </div>
                                      </DialogFooter>
                                    )}
                                  </DialogContent>
                                </Dialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </div>
      {modifyingRole && (
        <ModifyRoleDialog
          isOpen={!!modifyingRole}
          onClose={() => setModifyingRole(null)}
          role={modifyingRole}
          groupId={props.group.id}
        />
      )}
    </div>
  );
}
