import React from 'react'
import FormCard from './FormCard'
import { Session } from 'lucia'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link'

const LoginForm = () => {
    return (
        <FormCard title={"Welcome back"} description={'Please sign in'}>
            <div className="grid gap-2">
                <Label htmlFor='cred'>Username or Email</Label>
                <Input id="cred" type="text" placeholder='jhondoe@example.com' required />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor='password'>Password</Label>
                    <Link href="/auth/forgot-password" className="ml-auto inline-block text-sm underline font-thin">Forgot password?</Link>
                </div>
                <Input id="password" type="password" required />
            </div>
            <Button className="w-full" type='submit'>Log in</Button>
            <p className="text-center w-full font-thin text-xs">OR</p>
            <Button className="w-full gap-x-2 " variant={"outline"}>
                <FaGoogle size={15} />
                <p>Log in with Google</p>
            </Button>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?
                <Link href="/auth/register" className="underline ml-1">Register</Link>
            </div>
        </FormCard>
    )
}

export default LoginForm