import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const JoinGroup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="gap-2">
          Join Group
          <Plus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join group</DialogTitle>
          <DialogDescription>
          
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroup;
