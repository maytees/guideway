"use client";
import React, { useState, useTransition } from 'react'
import FormCard from './FormCard'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { type ILogin, loginSchema } from '~/lib/validation';
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from '~/actions/auth';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { ErrorComponent, SuccessComponent } from './FormInfo';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const form = useForm<ILogin>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    function onSubmit(
        values: ILogin
    ) {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }
                }).catch(() => {
                    form.reset();
                    setError("Something went wrong");
                })
        })
    }

    return (
        <FormCard title={"Welcome back"} description={'Please sign in'}>
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
                        name="password"
                        render={({ field }) => (
                            <FormItem className='mt-3'>
                                <div className="flex items-center">
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Link href="/auth/forgot-password" className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-2 mt-5">
                        <ErrorComponent message={error} />
                        <SuccessComponent message={success} />
                        <Button className="w-full" type='submit'>Log in</Button>
                        <p className="text-center w-full font-thin text-xs pt-2">OR</p>
                    </div>
                </form>
                <Button className="w-full gap-x-2 " variant={"outline"}
                    onClick={
                        () => {
                            router.push("/auth/google")
                        }
                    }>
                    <FaGoogle size={15} />
                    <span>Log in with Google</span>
                </Button>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?
                    <Link href="/auth/register" className="underline ml-1">Register</Link>
                </div>
            </Form >
        </FormCard >
    )
}

export default LoginForm