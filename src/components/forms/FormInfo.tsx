"use client";
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

type InfoType = {
  message: string | undefined;
};

export const ErrorComponent = ({
  message,
  children,
}: {
  message: string | undefined;
  children?: React.ReactNode;
}) => {
  if (!message) return null;

  return !children ? (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
      <FaExclamationCircle size={16} />
      <p>{message}</p>
    </div>
  ) : (
    <div className="flex w-full flex-row justify-between">
      <div className="flex items-center gap-x-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
        <FaExclamationCircle size={16} />
        <p>{message}</p>
      </div>
      {children}
    </div>
  );
};

export const SuccessComponent = ({ message }: InfoType) => {
  if (!message) return null;

  return (
    <div className="flex w-full items-center gap-x-2 rounded-md bg-emerald-500/10 p-3 text-sm text-primary">
      <FaExclamationCircle size={16} />
      <p>{message}</p>
    </div>
  );
};
