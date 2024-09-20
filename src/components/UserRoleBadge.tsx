import { getUserRoleInGroup } from "~/actions/dashboard/group/get-user-role";

export const colors: { bg: string; text: string }[] = [
  { bg: "#292524", text: "#FFFFFF" }, // Black
  { bg: "#f1f5f9", text: "#1e293b" }, // Slate
  { bg: "#ffedd5", text: "#9a3412" }, // Orange
  { bg: "#fef3c7", text: "#92400e" }, // Amber
  { bg: "#fef9c3", text: "#854d0e" }, // Yellow
  { bg: "#ecfccb", text: "#3f6212" }, // Lime
  { bg: "#cffafe", text: "#155e75" }, // Cyan
  { bg: "#e0e7ff", text: "#3730a3" }, // Indigo
  { bg: "#ede9fe", text: "#5b21b6" }, // Violet
  { bg: "#fae8ff", text: "#86198f" }, // Fuchsia
  { bg: "#ffe4e6", text: "#9f1239" }, // Rose
];

const UserRoleBadge = async (props: { userId: string; groupId: string }) => {
  const { role, error } = await getUserRoleInGroup(props.userId, props.groupId);

  if (!role) {
    return <div>{error}</div>;
  }

  return (
    <span
      className="w-fit rounded px-2 py-1 text-xs font-semibold"
      style={{
        backgroundColor: role.color,
        color:
          colors.find((c) => c.bg.toLowerCase() === role.color.toLowerCase())
            ?.text ?? "#000000",
      }}
    >
      {role.name}
    </span>
  );
};

export default UserRoleBadge;
