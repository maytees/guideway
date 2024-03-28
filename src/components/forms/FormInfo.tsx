"use client";
import React from 'react'
import { FaExclamationCircle } from 'react-icons/fa'

type InfoType = {
    message: string | undefined
}

export const ErrorComponent = ({ message, children }: { message: string | undefined, children?: React.ReactNode }) => {
    if (!message) return null;

    return (
        !children ?
            (
                <div className="bg-destructive/10 rounded-md p-3 flex items-center gap-x-2 text-sm text-destructive">
                    <FaExclamationCircle size={16} />
                    <p>{message}</p>
                </div>) : (
                <div className="w-full flex flex-row justify-between">
                    <div className="bg-destructive/10 rounded-md p-3 flex items-center gap-x-2 text-sm text-destructive">
                        <FaExclamationCircle size={16} />
                        <p>{message}</p>
                    </div>
                    {children}
                </div>
            )
    )
}

export const SuccessComponent = ({ message }: InfoType) => {
    if (!message) return null;

    return (
        <div className="bg-emerald-500/10 w-full rounded-md p-3 flex items-center gap-x-2 text-sm text-primary">
            <FaExclamationCircle size={16} />
            <p>{message}</p>
        </div>
    )
}