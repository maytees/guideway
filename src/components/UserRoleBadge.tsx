import { getUserRoleInGroup } from "~/actions/dashboard/group/get-user-role";
import { colors } from "~/lib/utils";

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
