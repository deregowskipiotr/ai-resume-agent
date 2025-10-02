"use client"

import React from "react";
import { ThemeToggle } from "@/components/ThemesToggle";
import { BookOpenIcon, BrainCircuitIcon, FileSlidersIcon, SpeechIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useClerk, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { UserAvatar } from "@/features/users/components/UserAvatar";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";



const navLinks = [
  {name: "Interviews", href: "interviews", Icon: SpeechIcon},
  {name: "Questions", href: "questions", Icon: BookOpenIcon},
  {name: "Resume", href: `resume`, Icon: FileSlidersIcon},
];


export function Navbar({ user }: { user: { name: string; imageUrl: string } }) {
  const { openUserProfile } = useClerk();
  const { jobInfoId } = useParams();
  const pathName = usePathname();

  return (
    //console.log('Navbar user:', user),
    <nav className="h-header border-b-[1px]">
      <div className="container flex h-full items-center justify-between">
        {/* Left: App logo and name */}
        <Link href="/app" className="flex items-center gap-3">
          <BrainCircuitIcon className="size-8 text-primary" />
          <span className="italic font-bold text-lg tracking-wide hidden md:block">PD</span>
        </Link>

        {/* Right: Theme toggle and user dropdown */}
        <div className="flex items-center gap-2">

          { typeof jobInfoId === 'string' && (
            navLinks.map(({ name, href, Icon}) => {
              const hrefPath = `/app/job-infos/${jobInfoId}/${href}`
              

              return (
                <Button 
                  key={name}
                  variant={pathName === hrefPath ? 'secondary' : 'ghost'}
                  asChild
                  className="cursor-pointer sm:hidden"
                >
                  <Link href={hrefPath}>
                    <Icon />
                    {name}
                  </Link>
                </Button>
              );
            })
          )}


          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserAvatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="flex flex-col w-[200px] h-[120px] mt-4 "
            >
              <DropdownMenuLabel className="mx-auto">
                {user.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => openUserProfile()}
                className="cursor-pointer"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <SignOutButton redirectUrl="/">Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
