"use client";
import {
  Club,
  Compass,
  LogOut,
  Settings,
  SidebarOpen,
  UserCircle,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { type GroupWithMembers } from "~/lib/types";

type SidebarLink = {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  isActive?: boolean;
};

const sidebarLinks: SidebarLink[] = [
  {
    href: "/dashboard",
    icon: <Club className="h-5 w-5" />,
    label: "Groups",
    badge: 6,
  },
  {
    href: "/dashboard/discover",
    icon: <Compass className="h-5 w-5" />,
    label: "Discover",
    isActive: true,
  },
  {
    href: "/dashboard/friends",
    icon: <UserPlus className="h-5 w-5" />,
    label: "Friends",
  },
  {
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
  },
  {
    href: "/dashboard/account",
    icon: <UserCircle className="h-5 w-5" />,
    label: "Account",
  },
  {
    href: "/dashboard/settings",
    icon: <LogOut className="h-5 w-5" />,
    label: "Log out",
  },
];

export default function Sidebar(props: { groups: GroupWithMembers[] }) {
  const pathname = usePathname();

  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden h-full border-r bg-muted/40 pt-10 md:block">
        <div className="flex h-full  flex-col gap-2">
          <div className="flex h-14 items-center border-b lg:h-[60px] lg:px-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Image src={"/logo.svg"} alt={""} width={50} height={50} />
              <span className="text-xl">Guideway</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
              {sidebarLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-primary/5 hover:text-primary ${
                      isActive
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.icon}
                    {link.label}
                    {link.badge && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {props.groups.length - 1}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-5 top-8 shrink-0 md:hidden"
            >
              <SidebarOpen className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <div className="flex h-14 items-center border-b lg:h-[60px] lg:px-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-semibold"
              >
                <Image src={"/logo.svg"} alt={""} width={50} height={50} />
                <span className="text-xl">Guideway</span>
              </Link>
            </div>
            <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
              {sidebarLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-primary/5 hover:text-primary ${
                      isActive
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.icon}
                    {link.label}
                    {link.badge && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {props.groups.length - 1}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
