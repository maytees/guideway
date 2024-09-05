import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const FormCard = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="mx-auto my-20 max-w-md">
      <CardHeader className="flex flex-col items-center">
        <Image src={"/logo.svg"} alt={"Guideway"} width={80} height={80} />
        <CardTitle className="flex w-full flex-col items-center">
          <span className="text-center text-2xl">{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">{children}</CardContent>
    </Card>
  );
};

export default FormCard;
