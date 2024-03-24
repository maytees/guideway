import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from "next/image";

const FormCard = (
    {
        children,
        title,
        description,
    }: {
        children: React.ReactNode,
        title: string,
        description: string
    }
) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Image src={'/logo.svg'} alt={''} />
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default FormCard