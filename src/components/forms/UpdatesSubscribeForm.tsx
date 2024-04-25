import React, { useTransition } from 'react';
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { updatesSignupSchema, type IUpdatesSignup } from '~/lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { welcomeUpdates } from '~/actions/send-updates-email';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const UpdatesSubscribeForm = (
    {
        containerClass,
        inputClass,
        buttonClass
    }: {
        containerClass?: string,
        inputClass?: string,
        buttonClass?: string
    }
) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<IUpdatesSignup>({
        resolver: zodResolver(updatesSignupSchema),
        defaultValues: {
            email: '',
            firstName: ''
        }
    });

    function onSubmit(
        values: IUpdatesSignup
    ) {
        startTransition(() => {
            welcomeUpdates(values).then((data) => {
                if (data?.error) {
                    toast.error(data.error);
                }

                if (data?.success) {
                    form.reset();
                    toast.success(data.success);
                }
            }).catch(() => {
                toast.error("Something went wrong");
            });
        });
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={containerClass}>
                    <FormField
                        disabled={isPending}
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="text" disabled={isPending} placeholder="First Name" className={inputClass} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={isPending}
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="email" disabled={isPending} placeholder="Email" {...field} className={inputClass} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button size="lg" variant="default" disabled={isPending} type="submit" className={buttonClass}>Subscribe</Button>
                </form>
            </Form>
        </>
    );
};

export default UpdatesSubscribeForm;