import { type User } from "@prisma/client";

const SidebarProfile = (props: { user: User }) => {
  return (
    <div className="ml-2 flex items-center gap-2 font-semibold">
      <img
        src={`https://api.dicebear.com/9.x/shapes/svg?seed=${props.user.name}`}
        alt={"name" + props.user.name}
        className="size-10 rounded-full"
      />
      <div>
        <h1 className="text-base">{props.user.name}</h1>
        <p className="text-xs font-light">{props.user.email}</p>
      </div>
    </div>
  );
};

export default SidebarProfile;
