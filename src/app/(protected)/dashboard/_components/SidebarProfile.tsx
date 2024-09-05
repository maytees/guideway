import { type User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const SidebarProfile = (props: { user: User }) => {
  return (
    <div className="ml-2 flex items-center gap-2 font-semibold">
      <Avatar>
        <AvatarImage
          src={`https://api.dicebear.com/9.x/shapes/svg?seed=${props.user.name}`}
        />
        <AvatarFallback>{props.user.name?.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-base">{props.user.name}</h1>
        <p className="text-xs font-light">{props.user.email}</p>
      </div>
    </div>
  );
};

export default SidebarProfile;
