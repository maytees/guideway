"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import FormCard from '~/components/forms/FormCard';
import { ErrorComponent } from '~/components/forms/FormInfo';
import { Button } from '~/components/ui/button';

const Error = () => {
    const searchParams = useSearchParams();
    const errorCode = searchParams.get("code");

    const [error, setError] = useState<string | undefined>();

    const router = useRouter();

    useEffect(() => {
        if (!errorCode) {
            setError("Error not provided")
            return;
        }

        if (errorCode === "409") {
            setError("Account with email already exists")
            return;
        }

    }, [errorCode]);

    return (
        <FormCard title={"Oops.."} description={"Something went wrong.."}>
            <div className="mt-2 space-y-2">
                <ErrorComponent message={error} />
                <Button type="submit" className='w-full' onClick={() => {
                    router.push("/auth/register")
                }}>Back to register</Button>
            </div>
        </FormCard >
    )
}

export default Error
