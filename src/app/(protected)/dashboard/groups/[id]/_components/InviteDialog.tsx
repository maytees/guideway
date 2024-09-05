"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const InviteDialog = (props: { joinCode: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(props.joinCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Invite</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Invite a Friend</AlertDialogTitle>
          <AlertDialogDescription>
            Share this join code with your friend to invite them to your group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 flex items-center space-x-2">
          <Input
            value={props.joinCode}
            readOnly
            disabled
            className="text-center font-mono"
          />
          <Button
            size="icon"
            variant="outline"
            onClick={copyToClipboard}
            aria-label="Copy join code"
          >
            {copied ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
        <AlertDialogFooter className="w-full sm:justify-start">
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InviteDialog;
