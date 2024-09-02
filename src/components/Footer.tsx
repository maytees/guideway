"use client";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UpdatesSubscribeForm from "./forms/UpdatesSubscribeForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Separator } from "./ui/separator";

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
    <footer className="border border-t-2 px-10 pb-20 pt-20 md:px-14 xl:px-40">
      <div className="flex flex-col justify-center lg:flex-row lg:space-x-10 xl:justify-between 2xl:justify-center 2xl:space-x-32">
        <div>
          <div className="flex flex-row items-center space-x-2 lg:items-start">
            <Image src={"/logo.svg"} alt="logo" width={80} height={80} />
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-bold">
                Clubs Reimaged for the
                <br /> Digital Age
              </h1>
              <p className="text-muted-foreground">
                ©Guideway 2024. All rights reserved.
              </p>
            </div>
          </div>
          {/* TODO: Add subscribe form */}
          <UpdatesSubscribeForm
            inputClass="lg:w-96"
            buttonClass="w-full"
            containerClass="space-y-2 mt-10"
          />
          {/* <Input className="lg:w-96" placeholder='First Name' />
                        <Input className="lg:w-96" placeholder='Email' />
                        <Button variant="default" className='w-full lg:w-96'>Subscribe</Button> */}
          <p className="my-5 text-center text-sm font-medium text-muted-foreground lg:w-96">
            OR
          </p>
          <div className="flex flex-row justify-between lg:w-96">
            <TwitterLogoIcon
              className="transition-all duration-100 ease-in-out hover:-skew-x-1 hover:-skew-y-1 hover:cursor-pointer hover:shadow-2xl"
              onClick={() => router.push("")}
              width={32}
              height={32}
            />
            <InstagramLogoIcon
              className="transition-all duration-100 ease-in-out hover:-skew-x-1 hover:-skew-y-1 hover:cursor-pointer hover:shadow-2xl"
              onClick={() => router.push("")}
              width={32}
              height={32}
            />
            <LinkedInLogoIcon
              className="transition-all duration-100 ease-in-out hover:-skew-x-1 hover:-skew-y-1 hover:cursor-pointer hover:shadow-2xl"
              onClick={() => router.push("")}
              width={32}
              height={32}
            />
          </div>
          <Separator className="my-5 lg:hidden" />
        </div>

        <div className="hidden grid-cols-4 lg:space-x-2 xl:grid xl:space-x-12">
          <div className="flex flex-col space-y-2">
            <p className="font-bold">Resources</p>
            {resources.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-muted-foreground transition-all duration-100 ease-in-out hover:scale-105 hover:text-foreground"
              >
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
                className="text-muted-foreground transition-all duration-100 ease-in-out hover:scale-105 hover:text-foreground"
              >
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
                className="text-muted-foreground transition-all duration-100 ease-in-out hover:scale-105 hover:text-foreground"
              >
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
                className="text-muted-foreground transition-all duration-100 ease-in-out hover:scale-105 hover:text-foreground"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <Accordion
          className="w-full self-center lg:w-96 xl:hidden"
          type="multiple"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Resources</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {resources.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="pl-2 transition-all duration-100 ease-in-out hover:font-bold"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Legal</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {legal.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="pl-2 transition-all duration-100 ease-in-out hover:font-bold"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Company</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {company.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="pl-2 transition-all duration-100 ease-in-out hover:font-bold"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Support</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {support.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="pl-2 transition-all duration-100 ease-in-out hover:font-bold"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </footer>
  );
};

export default Footer;
