import React from 'react'
import FormCard from './FormCard'
import { Session } from 'lucia'

const LoginForm = (
    {
        session
    }: {
        session: Session
    }
) => {
    return (
        <FormCard title={"Welcome back"} description={'Please sign in'}>

        </FormCard>
    )
}

export default LoginForm