import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Image from "next/image";

const FormCard = (
    {
        children,
        title,
        description,
    }: {
        children: React.ReactNode,
        title: string,
        description: string,
    }
) => {
    return (
        <Card className="mt-56 mx-auto max-w-sm">
            <CardHeader className='flex flex-col items-center'>
                <CardTitle className="flex w-full flex-col items-center">
                    <Image src={'/logo.svg'} alt={'Guideway'} width={80} height={80} />
                    <h1 className="text-center text-2xl">{title}</h1>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {children}
            </CardContent>
        </Card>
    )
}

export default FormCard