"use client";
import Image from "next/image";
import { type Variants, motion, useAnimation } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { Card, CardDescription, CardHeader, CardTitle, CardFooter, CardContent } from "~/components/ui/card";
import { ChevronRightIcon, InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Input } from "~/components/ui/input";

export default function HomePage() {
  const router = useRouter();

  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [featuresHeadingRef, featuresHeadingInView] = useInView();

  const convincedControls = useAnimation();
  const [convincedRef, convincedInView] = useInView();

  useEffect(() => {
    if (inView) {
      void controls.start("visible");
    }

    if (featuresHeadingInView) {
      void controls.start("visible");
    }

    if (convincedInView) {
      void convincedControls.start("visible");
    }
  }, [controls, convincedControls, convincedInView, featuresHeadingInView, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      y: 100
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5
      }
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center mt-48">
      <div className="relative">
        <h1 className="text-6xl font-bold text-center z-10">
          Empowering School<br />Clubs to Thrive</h1>
        <div className="absolute top-12 right-16 md:-top-28 md:right-0 -z-10">
          <div className="-z-10 w-52 h-52 md:w-[550px] md:h-[550px] rounded-full blur-3xl opacity-25 animate-spin bg-gradient-to-bl  from-[#FF5800] to-[#FFBC00]"></div>
        </div>
        <p className="text-center font-semibold mt-5 z-10">An all in one platform that simplifies school club<br />
          management, allowing students to discover, join,
          <br />and thrive in clubs they love.
        </p>
        <div className="hidden md:block absolute top-20 -right-2">
          <ArrowSVG />
        </div>
      </div>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <a href="/#notified" className="z-10">
              <Button className="mt-4 font-semibold max-sm:w-64 max-sm:h-12 z-10">
                Subscribe to updates
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="select-none">Get notified for when we launch</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="mt-64 flex flex-col items-center">
        <div className="pb-20 md:pb-0 xl:pb-5">
          <motion.h1
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={controls}
            className="text-4xl text-center font-bold mt-28">What do we offer?
          </motion.h1>
          <motion.p
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={controls}
            className="text-center font-semibold text-lg text-muted-foreground"
          >
            Here are a list of features we offer
          </motion.p>
        </div>
        <Features />

        <motion.div
          ref={featuresHeadingRef}
          variants={variants}
          initial="hidden"
          animate={controls}
        >
          <Button
            className="mt-10"
            size="lg" variant="default" onClick={() => router.push("/features")}>View all features</Button>
        </motion.div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <div className="pb-20 xl:pb-5">
          <motion.h1
            ref={convincedRef}
            variants={variants}
            initial="hidden"
            animate={convincedControls}
            className="text-4xl text-center font-bold mt-28">Are you convinced yet?
          </motion.h1>
          <motion.p
            ref={convincedRef}
            variants={variants}
            initial="hidden"
            animate={convincedControls}
            className="text-center font-semibold text-lg text-muted-foreground"
          >
            Get notified when Guideway is released
          </motion.p>
        </div>

        <motion.div
          ref={convincedRef}
          variants={variants}
          initial="hidden"
          animate={convincedControls}
          className="flex flex-col items-center"
        >
          <div className="grid gap-10 grid-cols-3" id="notified">
            <TwitterLogoIcon className="hover:cursor-pointer transition-all hover:scale-105 duration-100 ease-in-out" onClick={() => router.push("")} width={40} height={40} />
            <InstagramLogoIcon className="hover:cursor-pointer transition-all hover:scale-105 duration-100 ease-in-out" onClick={() => router.push("")} width={40} height={40} />
            <LinkedInLogoIcon className="hover:cursor-pointer transition-all hover:scale-105 duration-100 ease-in-out" onClick={() => router.push("")} width={40} height={40} />
          </div>

          <span className="text-center font-semibold my-10">OR</span>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Stay in the loop</CardTitle>
              <CardDescription className="text-center">via email updates.</CardDescription>
            </CardHeader>
            <CardContent className="gap-2 grid">
              {/* TODO: Make this a form */}
              <Input placeholder="Email" className="w-96" />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="w-full" size="lg" variant="default" type="submit" onClick={() => alert("TODO: Subscribet for updates")}>Subscribe</Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div >
  );
}

interface IFeature {
  title: string;
  desc: string;
  icon: string;
  href: string;
  mid?: boolean;
  long: string;
  implemented?: boolean;
};

const featuresTwo: IFeature[] = [
  {
    title: "Club Promotions",
    desc: "Showcase your clubs achievements, events, and news to the entire school community.",
    long: "Showcase your club's achievements, events, and news to the entire school community with Guideway's promotion features. Create club  profiles, share photos & videos, and highlight your club's unique culture and values. Leverage Guideway's social sharing tools to spread  the word about upcoming events, fundraisers, and drives. Attract new members and build a strong reputation for your club.",
    icon: "/megaphone.svg",
    href: "/docs"
  },
  {
    title: "Quick Onboarding",
    desc: "Get started quickly as a school administrator. Guideway allows you to easily onboard every club in your school, and manage them with ease.",
    long: `
    Get started with Guideway quickly and easily, thanks to our step- by - step  onboarding process.Our intuitive setup wizard guides club leaders  through the creation of their club profile, member invitation, and  initial configuration.We also offer school - wide onboarding, which allows school administrators to onboard and monitor all clubs in their school.
    `,
    href: "/docs",
    icon: "/rocket.svg",
    mid: true
  },
  {
    title: "Polls & Voting",
    desc: "Can't decide? Then allow your club memebers to. Create polls on various topics, gather member opinions, and analyze results easily.",
    long: "Make important club decisions democratically with Guideway's polls and  voting system. Create polls on various topics, gather member opinions,  and analyze results easily. Whether you're electing club officers,  choosing event themes, or making budget allocations, Guideway ensures  that every member's voice is heard. Foster a sense of ownership and  engagement within your club.",
    href: "/docs",
    icon: "/vote.svg"
  }
];

const features: IFeature[] = [
  {
    title: "Club Guidelines",
    desc: "Guideway allows you to easily establish club club constitutions and bylaws. We also allow you to create your own profanity filter allowing you to keep your community pure.",
    long: `
    Establish and maintain your club's guidelines and bylaws with Guideway's  constitution feature. Store and display your club's mission statement,  membership criteria, and governing rules in a centralized location.  Ensure transparency by making your club's  constitution easily accessible to all members. 
    `,
    icon: "/scroll.svg",
    href: "/docs"
  },
  {
    title: "Club Management",
    desc: "Officers, Marketers, Presidents? We got you covered. Guideway has everything you need to manage your club. From member registration and role assignment, and permissions to attendance tracking and event planning.",
    long: `
    Streamline every aspect of club administration with Guideway's  comprehensive management tools. From member registration and role  assignment to attendance tracking and event planning, Guideway  simplifies the tasks of running a successful club. Our  intuitive interface and customizable settings enable club leaders to  manage their organizations efficiently, saving time and effort.
    `,
    icon: "/tri.svg",
    href: "/docs",
    mid: true
  },
  {
    title: "Communication",
    desc: "Guideway also allows you to communicate with other club members through our real time chat feature.",
    long: `
    Stay connected and engaged with your club members through Guideway's  communication features. Our platform offers a club  chat system, allowing members to discuss ideas, collaborate on projects,  and build strong relationships. With Guideway, your club will never  miss a beat.
    `,
    icon: "/paperplane.svg",
    href: "/docs"
  },
];

const Features = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const featureOne = useAnimation();
  const [refOne, featuresOneInView] = useInView();

  const md = useAnimation();
  const [mdRef, mdInView] = useInView();

  useEffect(() => {
    if (inView) {
      void controls.start("visible");
    }

    if (featuresOneInView) {
      void featureOne.start("visible");
    }

    if (mdInView) {
      void md.start("visible");
    }
  }, [controls, featureOne, featuresOneInView, inView, md, mdInView]);

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 150
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.5
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        ref={refOne}
        animate={featureOne}
        initial="hidden"
        variants={cardVariants}
        className="md:hidden xl:grid lg:mt-28 flex flex-col lg:pb-18 items-center grid-cols-1 gap-20 xl:grid-cols-3 w-full"
      >
        {features.map((feature) => (
          <Feature key={feature.title} {...feature} className={!feature.mid ? "lg:inline-block lg:mt-10" : ""} />
        ))}
      </motion.div>
      <Dash />
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={cardVariants}
        className="md:hidden xl:grid flex flex-col items-center grid-cols-1 gap-20 xl:grid-cols-3 w-full"
      >
        {featuresTwo.map((feature) => (
          <Feature key={feature.title} {...feature} className={!feature.mid ? "lg:inline-block lg:mt-10" : ""} />
        ))}
      </motion.div>
      <motion.div
        ref={mdRef}
        animate={md}
        initial="hidden"
        variants={cardVariants}
        className="hidden md:grid xl:hidden grid-cols-2 gap-10"
      >
        {featuresTwo.map((feature) => (
          <Feature key={feature.title} {...feature} />
        ))}
        {features.map((feature) => (
          <Feature key={feature.title} {...feature} />
        ))}
      </motion.div>
    </div>
  );
};

const Feature = (
  {
    title,
    desc,
    icon,
    href,
    className
  }: {
    title: string,
    desc: string,
    icon: string,
    href: string,
    className?: string
  }
) => {
  const router = useRouter();

  return (
    <Card
      className={"hover:-translate-y-5 hover:-skew-y-1 hover:shadow-2xl hover:border-1 hover:border-black duration-300 transition-all ease-in-out max-w-80 md:max-w-72 lg:max-w-80 flex flex-col justify-between min-h-52 " + className}>
      <div className="relative" >
        <Image
          src={icon}
          alt={title}
          className="absolute -top-8 -left-8"
          width={64}
          height={64}
        />
      </div>
      <CardHeader className="">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row justify-end">
        <Button size="sm" disabled={href === "/"} className="group" onClick={() => {
          if (href !== "/") {
            router.push(href);
          }
        }}>
          <p>View docs</p>
          <ChevronRightIcon className="group-hover:translate-x-1 duration-75 transition-all ease-in-out mt-1 h-3 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Dash = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      void controls.start("visible");
    }
  }, [controls, inView]);

  const pathVariants = {
    hidden: {
      opacity: 1,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <svg ref={ref} width="472" className="md:my-20 xl:my-10" height="77" overflow={"visible"} viewBox="0 0 472 77" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        variants={pathVariants}
        initial="hidden"
        animate={controls}
        fillRule="evenodd"
        clipRule="evenodd"
        className="hidden md:block pt-10"
        d="M2 74.7579C20.3333 41.4245 76 -15.2421 152 24.7579C247 74.7579 328.361 -13.0667 368 4C440 35 407.5 54.2579 470.5 54.2579" stroke="black" strokeWidth="3" strokeLinecap={"round"} strokeDasharray="6 6" />
    </svg>

  );
};
const ArrowSVG = () => {
  const pathVariants = {
    hidden: {
      opacity: 1,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <svg width="170" height="300" viewBox="0 0 300 300" overflow={"visible"} fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden md:block">
      <motion.path
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M173.865 1.12823C173.171 0.675858 172.242 0.871744 171.79 1.56575C171.337 2.25976 171.533 3.18909 172.227 3.64146C182.43 10.2919 192.276 18.0768 198.52 27.4139C200.702 30.6768 200.964 33.7458 200.025 36.5972C199.06 39.5272 196.775 42.3694 193.604 44.936C188.221 49.2916 180.638 52.5663 174.023 53.9828L174.02 53.9685C172.616 47.8491 170.032 41.5037 164.751 38.6454C163.072 37.7364 161.377 37.646 159.829 38.1206C158.326 38.5814 157.036 39.548 156.008 40.6426C154.974 41.7437 154.139 43.0437 153.558 44.2955C152.99 45.521 152.606 46.829 152.606 47.9438C152.606 50.1785 153.296 52.0361 154.517 53.5056C155.718 54.9517 157.361 55.9357 159.149 56.5884C162.697 57.8836 167.12 57.9872 170.918 57.5416C171.164 57.5127 171.413 57.4808 171.663 57.4461C172.352 61.3283 172.669 65.1608 172.923 68.226L172.923 68.2265L172.923 68.2292C172.998 69.1391 173.068 69.9814 173.14 70.7372C174.572 85.7437 171.607 99.1557 164.561 110.908C157.507 122.676 146.311 132.864 131.16 141.312C104.414 156.225 70.9115 163.655 39.418 168.553C28.1264 170.309 17.01 171.357 5.63458 171.517L15.3168 163.033C15.9399 162.488 16.0025 161.54 15.4566 160.917C14.9106 160.294 13.963 160.231 13.3399 160.777L0.730928 171.824C0.392357 172.121 0.204903 172.554 0.220301 173.004C0.235699 173.454 0.45232 173.873 0.810382 174.146L13.4193 183.752C14.0783 184.254 15.0195 184.127 15.5215 183.468C16.0236 182.809 15.8964 181.868 15.2374 181.366L6.23579 174.508C17.5749 174.32 28.6528 173.263 39.879 171.517C71.4351 166.61 105.385 159.119 132.621 143.933C148.111 135.296 159.748 124.774 167.135 112.451C174.531 100.112 177.615 86.0527 176.126 70.4521C176.059 69.7505 175.993 68.9491 175.921 68.0691C175.669 65.0084 175.338 60.9968 174.617 56.9234C181.674 55.4174 189.707 51.9482 195.491 47.2681C198.907 44.5038 201.662 41.2176 202.874 37.5356C204.112 33.775 203.69 29.7484 201.014 25.7462C194.426 15.8948 184.165 7.84178 173.865 1.12823ZM163.323 41.2838C167.335 43.4551 169.678 48.5381 171.064 54.5C170.897 54.5221 170.732 54.5428 170.568 54.562C167.003 54.9803 163.108 54.84 160.178 53.7704C158.727 53.2407 157.592 52.512 156.824 51.5884C156.076 50.6883 155.606 49.5193 155.606 47.9438C155.606 47.4342 155.807 46.5771 156.28 45.5576C156.741 44.5643 157.403 43.5393 158.195 42.6963C158.993 41.8468 159.857 41.25 160.708 40.9889C161.515 40.7416 162.375 40.7709 163.323 41.2838Z"
        stroke="#000000"
        strokeWidth="5"
      />
    </svg>
  );
};