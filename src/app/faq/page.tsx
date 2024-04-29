import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';

const releaseAndAvailabilityFAQ = [
    {
        question: "When is the planned release date for Guideway?",
        answer: "Guideway will most likely release in the summer of 2024, in preparation for the new school year. As for the specific date, we aren't able to provide, but the approximate time will be late August or early September."
    },
    {
        question: "Will there be a beta testing phase before the official launch?",
        answer: "Yes! There will definitely be beta testing. We will reach out to subscribers of the newsletter asking if they would like to be a beta tester. As we are a group of students who develop the app, we will also reach out to our fellow schoolmates and club leaders asking if they'd like to beta test."
    },
    {
        question: "What platforms will Guideway be available on (web, iOS, Android)?",
        answer: "At the moment, we are only supporting the web platform, although we may implement mobile support later in the future; although, the good news is that the web is supported on all platforms, so no need to worry."
    },
    {
        question: "Will Guideway be available worldwide or limited to specific regions?",
        answer: "Guideway will be available worldwide, although we will only accept payments with the dollar."
    }
];

const pricingAndPaymentFAQ = [
    {
        question: "How much will Guideway cost for users?",
        answer: "We are hoping to allow club leaders to buy the product for a minimum of $0, although paid plans start at $20/month. View the pricing page for more info."
    },
    {
        question: "Will there be different pricing plans or subscription tiers?",
        answer: "Yes, there will be 3 different pricing plans, they consist of: A free tier, with very minimal features, a paid tier with more features starting at $20/month, and a school tier, for school admins to quickly onboard their students (similar to an enterprise plan)."
    },
    {
        question: "Are there any special offers or discounts planned for early adopters?",
        answer: "Yes, beta testers will receive a discount once the product is released."
    },
    {
        question: "Will Guideway offer a free trial period for new users?",
        answer: "No, we do not plan to offer a free trial period for paid tiers, as we will have a free tier in place."
    },
    {
        question: "What payment methods will be accepted for Guideway subscriptions?",
        answer: "Guideway will accept all major credit cards, and online payment methods such as Apple Pay, via our Stripe integration."
    }
];

const updatesAndSupportFAQ = [
    {
        question: "How often will new features and updates be released for Guideway?",
        answer: "In the early days of Guideway, we will most likely release new features every week or two, but as Guideway gets older, we will release major updates every month."
    },
    {
        question: "What kind of customer support will be available for Guideway users?",
        answer: "We plan to integrate our own ticketing system to handle support questions; we also plan to add an AI chat assistant to allow for accessible support 24/7."
    }
];

const marketingAndIntegrationsFAQ = [
    {
        question: "Are there any upcoming marketing campaigns or promotions planned for Guideway?",
        answer: "Yes, we plan to market Guideway with ads on Facebook, Instagram, Tiktok, Snapchat, and paid promotions."
    },
    {
        question: "Will Guideway integrate with any other popular tools or platforms?",
        answer: "At the moment, we do not have any plans to integrate with external tools, although we do use Google for OAuth logins."
    }
];

const generalFAQ = [
    {
        question: "How can interested users stay updated on Guideway's development and release?",
        answer: "You can stay up to date with Guideway's development by subscribing to our emails by clicking here."
    }
];


const FAQPage = () => {
    return (
        <div className="mt-32 2xl:px-96">
            <>
                <h1 className='text-2xl lg:text-4xl font-bold text-center'>Are you stuck?</h1>
                <p className='text-muted-foreground mt-2 text-sm lg:text-base text-center'>Here are some frequently asked questions about Guideway.</p>
            </>

            <div className="mt-10 space-y-16">
                <div className="flex flex-col items-center w-full">
                    <h2 className='text-2xl font-semibold text-left w-[80%]'>General</h2>
                    <h3 className='text-sm text-muted-foreground font-normal text-left w-[80%]'>Here are some general questions about Guideway.</h3>
                    <Accordion type="single" collapsible className='w-[80%] mt-2'>
                        {generalFAQ.map((faq, index) => (
                            <AccordionItem key={index} value={index.toString()}>
                                <AccordionTrigger className="text-foreground">{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="flex flex-col items-center w-full">
                    <h2 className='text-2xl font-semibold text-left w-[80%]'>Release and Availability</h2>
                    <h3 className='text-sm text-muted-foreground font-normal text-left w-[80%]'>Questions related to Guideway&apos;s release and availability.</h3>
                    <Accordion type="single" collapsible className='w-[80%] mt-2'>
                        {releaseAndAvailabilityFAQ.map((faq, index) => (
                            <AccordionItem key={index} value={index.toString()}>
                                <AccordionTrigger className="text-foreground">{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="flex flex-col items-center w-full">
                    <h2 className='text-2xl font-semibold text-left w-[80%]'>Pricing and Payment</h2>
                    <h3 className='text-sm text-muted-foreground font-normal text-left w-[80%]'>Questions related to pricing and payment for Guideway.</h3>
                    <Accordion type="single" collapsible className='w-[80%] mt-2'>
                        {pricingAndPaymentFAQ.map((faq, index) => (
                            <AccordionItem key={index} value={index.toString()}>
                                <AccordionTrigger className="text-foreground">{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="flex flex-col items-center w-full">
                    <h2 className='text-2xl font-semibold text-left w-[80%]'>Updates and Support</h2>
                    <h3 className='text-sm text-muted-foreground font-normal text-left w-[80%]'>Questions related to updates and support for Guideway.</h3>
                    <Accordion type="single" collapsible className='w-[80%] mt-2'>
                        {updatesAndSupportFAQ.map((faq, index) => (
                            <AccordionItem key={index} value={index.toString()}>
                                <AccordionTrigger className="text-foreground">{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="flex flex-col items-center w-full">
                    <h2 className='text-2xl font-semibold text-left w-[80%]'>Marketing and Integrations</h2>
                    <h3 className='text-sm text-muted-foreground font-normal text-left w-[80%]'>Questions related to marketing and integrations for Guideway.</h3>
                    <Accordion type="single" collapsible className='w-[80%] mt-2'>
                        {marketingAndIntegrationsFAQ.map((faq, index) => (
                            <AccordionItem key={index} value={index.toString()}>
                                <AccordionTrigger className="text-foreground">{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;