"use client";
import Image from 'next/image';
import React from 'react';
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { Separator } from './ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import Link from 'next/link';
import UpdatesSubscribeForm from './forms/UpdatesSubscribeForm';

interface FooterLink {
    title: string;
    href: string;
}

const resources: FooterLink[] = [
    {
        title: "Home",
        href: "/",
    },
    // {
    //     title: "Getting Started",
    //     href: "/docs/getting-started"
    // },
    // {
    //     title: "Features",
    //     href: "/features",
    // },
    // {
    //     title: "Demo",
    //     href: "/demo",
    // },
    // {
    //     title: "Docs",
    //     href: "/docs",
    // },
    // {
    //     title: "Pricing",
    //     href: "/pricing",
    // },
    // {
    //     title: "Tutorials",
    //     href: "/docs/tutorials",
    // }
];

const legal: FooterLink[] = [
    // {
    //     title: "Terms of Service",
    //     href: "/terms",
    // },
    // {
    //     title: "Privacy Policy",
    //     href: "/privacy",
    // },
    // {
    //     title: "Cookie Policy",
    //     href: "/cookies",
    // }
];

const company: FooterLink[] = [
    // {
    //     title: "About Us",
    //     href: "/about",
    // },
    // {
    //     title: "Contact Us",
    //     href: "/contact",
    // },
    // {
    //     title: "Our Team",
    //     href: "/team",
    // },
    {
        title: "News",
        href: "/#notified",
    },
];

const support: FooterLink[] = [
    {
        title: "FAQ",
        href: "/faq",
    },
    // {
    //     title: "Report a Bug",
    //     href: "/support/ticket?type=bug",
    // },
    // {
    //     title: "Feature Request",
    //     href: "/support/ticket?type=feature",
    // },
    // {
    //     title: "Feedback",
    //     href: "/support/ticket?type=feedback",
    // },
    // {
    //     title: "Socials",
    //     href: "/socials",
    // }
];

const Footer = () => {
    const router = useRouter();

    return (
        <footer className='pb-20 border border-t-2 px-10 pt-20 mt-48 md:px-14 xl:px-60'>
            <div className="flex flex-col lg:flex-row justify-center lg:space-x-10 xl:justify-between 2xl:justify-center 2xl:space-x-32">
                <div>
                    <div className="flex flex-row space-x-2 items-center lg:items-start">
                        <Image
                            src={"/logo.svg"}
                            alt="logo"
                            width={80}
                            height={80}
                        />
                        <div className="flex flex-col space-y-2">
                            <h1 className='text-2xl font-bold'>Clubs Reimaged for the<br /> Digital Age</h1>
                            <p className='text-muted-foreground'>©Guideway 2024. All rights reserved.</p>
                        </div>
                    </div>
                    {/* TODO: Add subscribe form */}
                    <UpdatesSubscribeForm
                        inputClass='lg:w-96'
                        buttonClass='w-full'
                        containerClass='space-y-2 mt-10'
                    />
                    {/* <Input className="lg:w-96" placeholder='First Name' />
                        <Input className="lg:w-96" placeholder='Email' />
                        <Button variant="default" className='w-full lg:w-96'>Subscribe</Button> */}
                    <p className="text-muted-foreground text-center text-sm font-medium my-5 lg:w-96">
                        OR
                    </p>
                    <div className="flex flex-row justify-between lg:w-96">
                        <TwitterLogoIcon className="hover:cursor-pointer transition-all hover:-skew-x-1 hover:-skew-y-1 hover:shadow-2xl duration-100 ease-in-out" onClick={() => router.push("")} width={32} height={32} />
                        <InstagramLogoIcon className="hover:cursor-pointer transition-all hover:-skew-x-1 hover:-skew-y-1 hover:shadow-2xl duration-100 ease-in-out" onClick={() => router.push("")} width={32} height={32} />
                        <LinkedInLogoIcon className="hover:cursor-pointer transition-all hover:-skew-x-1 hover:-skew-y-1 hover:shadow-2xl duration-100 ease-in-out" onClick={() => router.push("")} width={32} height={32} />
                    </div>
                    <Separator className='my-5 lg:hidden' />
                </div>

                <div className='hidden xl:grid grid-cols-4 lg:space-x-2 xl:space-x-12'>
                    <div className="flex flex-col space-y-2">
                        <p className="font-bold">Resources</p>
                        {resources.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="transition-all hover:scale-105 duration-100 ease-in-out text-muted-foreground hover:text-foreground">
                                {link.title}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <p className="font-bold">Legal</p>
                        {legal.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="transition-all hover:scale-105 duration-100 ease-in-out text-muted-foreground hover:text-foreground">

                                {link.title}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p className="font-bold">Company</p>
                        {company.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="transition-all hover:scale-105 duration-100 ease-in-out text-muted-foreground hover:text-foreground">

                                {link.title}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p className="font-bold">Support</p>
                        {support.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="transition-all hover:scale-105 duration-100 ease-in-out text-muted-foreground hover:text-foreground">

                                {link.title}
                            </Link>
                        ))}
                    </div>

                </div>
                <Accordion className='xl:hidden lg:w-96 w-full self-center' type="multiple">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            Resources
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col space-y-2">
                                {resources.map((link) => (
                                    <Link
                                        key={link.title}
                                        href={link.href}
                                        className="transition-all hover:font-bold duration-100 ease-in-out pl-2">

                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            Legal
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col space-y-2">
                                {legal.map((link) => (
                                    <Link
                                        key={link.title}
                                        href={link.href}
                                        className="transition-all hover:font-bold duration-100 ease-in-out pl-2">

                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            Company
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col space-y-2">
                                {company.map((link) => (
                                    <Link
                                        key={link.title}
                                        href={link.href}
                                        className="transition-all hover:font-bold duration-100 ease-in-out pl-2">

                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger>
                            Support
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col space-y-2">
                                {support.map((link) => (

                                    <Link
                                        key={link.title}
                                        href={link.href}
                                        className="transition-all hover:font-bold duration-100 ease-in-out pl-2">
                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </footer >
    );
};

export default Footer;