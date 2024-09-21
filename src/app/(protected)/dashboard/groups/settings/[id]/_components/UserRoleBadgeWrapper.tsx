import UserRoleBadge from "~/components/UserRoleBadge";

export const UserRoleBadgeWrapper = ({
    userId,
    groupId,
}: {
    userId: string;
    groupId: string;
}) => {
    return <UserRoleBadge userId={userId} groupId={groupId} />;
};