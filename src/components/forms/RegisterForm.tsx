"use client";
import React, { useEffect, useState, useTransition } from 'react';
import FormCard from './FormCard';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { registerSchema, type IRegister } from '~/lib/validation';
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from '~/actions/auth';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { ErrorComponent, SuccessComponent } from './FormInfo';
import { useRouter, useSearchParams } from 'next/navigation';

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const searchParams = useSearchParams();
    const errorCode = searchParams.get("code");

    const router = useRouter();

    const form = useForm<IRegister>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            username: '',
            confirmPassword: ''
        }
    });

    useEffect(() => {
        if (errorCode === "409") {
            setError("Account with email already exists");
            return;
        }

    }, [errorCode]);

    function onSubmit(
        values: IRegister
    ) {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                }).catch(() => {
                    form.reset();
                    setError("Something went wrong");
                });
        });
    }

    return (
        <FormCard title={"Hello there"} description={'Please create an account'}>
            {!success ?
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            disabled={isPending}
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" disabled={isPending} placeholder='example@example.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={isPending}
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className='mt-3'>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={isPending} placeholder='jhon_doe' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={isPending}
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className='mt-3'>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" disabled={isPending} placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={isPending}
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className='mt-3'>
                                    <FormLabel htmlFor="password">Confirm password</FormLabel>
                                    <FormControl>
                                        <Input type="password" disabled={isPending} placeholder='Confirm your password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-2 mt-5">
                            <ErrorComponent message={error} />
                            <Button className="w-full" type='submit' disabled={isPending}>Register</Button>
                            <p className="text-center pt-2 w-full font-thin text-xs">OR</p>
                        </div>
                    </form>
                    <Button className="w-full gap-x-2" variant={"outline"} disabled={isPending}
                        onClick={
                            () => router.push("/auth/google")
                        }
                    >
                        <FaGoogle size={15} />
                        <span>Register with Google</span>
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?
                        <Link href="/auth/login" className="underline ml-1">Log in</Link>
                    </div>
                </Form >
                :
                <div className='mx-auto w-full'>
                    <SuccessComponent message={success} />
                    <p className='text-center w-full font-normal text-sm mt-2'>Go <Link href="/" className="underline">home</Link></p>
                </div>
            }
        </FormCard >
    );
};

export default RegisterForm;