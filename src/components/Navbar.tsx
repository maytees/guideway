"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const ICON_WIDTH = 64;

const Navbar = () => {
  const currentPath = usePathname();
  const router = useRouter();

  // This is very stupid. I had problems with layout so this is a solution for now..
  if (currentPath.includes("dashboard")) {
    return;
  }

  return (
    <div className="top-0 z-50 mt-10 flex h-16 items-center gap-4 px-10 pb-10 pt-10 md:px-6">
      <nav className="container hidden flex-row gap-24 md:flex md:items-center md:justify-between md:px-14 lg:px-32">
        <div className="flex flex-row items-center gap-16">
          <div className="flex-shrink-0">
            <Link
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
              href="/"
            >
              <Image
                src="/logo.svg"
                className="flex-shrink-0"
                alt="Guideway"
                width={ICON_WIDTH}
                height={ICON_WIDTH}
              />
              <span className="sr-only">Guideway</span>
            </Link>
          </div>
          <div className="flex gap-5 *:text-center *:font-semibold lg:gap-10">
            {/* <Link className="text-foreground transition-colors hover:text-foreground" href="/features">
                            Features
                        </Link> */}
            {/* <Link className={`text-black hover:text-muted-foreground ${currentPath === '/pricing' ? 'text-foreground' : ''}`} href="/pricing">
                            Pricing
                        </Link> */}
            {/* <Link className={`text-black hover:text-muted-foreground ${currentPath === '/support' ? 'text-foreground' : ''}`} href="/support">
                            Support
                        </Link> */}
            <Link
              className={`text-black hover:text-muted-foreground ${currentPath === "/faq" ? "text-foreground" : ""}`}
              href="/faq"
            >
              FAQ
            </Link>
          </div>
        </div>

        <a href="/auth/register">
          <Button
            className="shrink-0 font-semibold"
            size="lg"
            variant="default"
          >
            Get started
          </Button>
        </a>
      </nav>
      <div className="flex w-full flex-row items-center justify-between md:hidden">
        <Image
          src="/logo.svg"
          alt="Guideway"
          width={ICON_WIDTH}
          height={ICON_WIDTH}
          className="hover:cursor-pointer md:hidden"
          onClick={() => router.push("/")}
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden"
              size="icon"
              variant="outline"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className="flex items-center gap-2 text-lg font-semibold"
                href="/"
              >
                <Image
                  src="/logo.svg"
                  alt="Guideway"
                  width={ICON_WIDTH}
                  height={ICON_WIDTH}
                />
                <span className="sr-only">Guideway</span>
              </Link>
              {/* <Link className="text-foreground transition-colors hover:text-foreground" href="/features">
                                Features
                            </Link> */}
              {/* <Link className={`text-black hover:text-muted-foreground ${currentPath === '/pricing' ? 'text-foreground' : ''}`} href="/pricing">
                                Pricing
                            </Link> */}
              {/* <Link className={`text-black hover:text-muted-foreground ${currentPath === '/support' ? 'text-foreground' : ''}`} href="/support">
                                Support
                            </Link> */}
              <Link
                className={`text-black hover:text-muted-foreground ${currentPath === "/faq" ? "text-foreground" : ""}`}
                href="/faq"
              >
                FAQ
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default Navbar;
