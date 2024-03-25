"use client";
import React, { useState, useTransition } from 'react'
import FormCard from './FormCard'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { registerSchema, type IRegister } from '~/lib/validation';
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from '~/actions/auth';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { ErrorComponent, SuccessComponent } from './FormInfo';

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<IRegister>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            username: '',
            confirmPassword: ''
        }
    });

    function onSubmit(
        values: IRegister
    ) {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                }).catch(() => {
                    form.reset();
                    setError("Something went wrong");
                })
        })
    }

    return (
        <FormCard title={"Hello there"} description={'Please create an account'}>
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
                                    <Input type="email" placeholder='example@example.com' {...field} />
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
                            <FormItem >
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder='jhon_doe' {...field} />
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
                                    <Input type="password" placeholder="Enter your password" {...field} />
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
                                    <Input type="password" placeholder='Confirm your password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-2 mt-5">
                        <ErrorComponent message={error} />
                        <SuccessComponent message={success} />
                        <Button className="w-full" type='submit'>Register</Button>
                        <p className="text-center w-full font-thin text-xs">OR</p>
                        <Button className="w-full gap-x-2 " variant={"outline"}>
                            <FaGoogle size={15} />
                            <span>Register with Google</span>
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?
                        <Link href="/auth/login" className="underline ml-1">Log in</Link>
                    </div>
                </form>
            </Form >
        </FormCard >
    )
}

export default RegisterForm