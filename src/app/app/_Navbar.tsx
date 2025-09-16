"use client"

import React from "react";
import { ThemeToggle } from "@/components/ThemesToggle";
import { BrainCircuitIcon } from "lucide-react";
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



export function Navbar({ user }: { user: { name: string; imageUrl: string } }) {
  const { openUserProfile } = useClerk();

  return (
    <nav className="h-header border-b-[1px]">
      <div className="container flex h-full items-center justify-between">
        {/* Left: App logo and name */}
        <Link href="/app" className="flex items-center gap-3">
          <BrainCircuitIcon className="size-8 text-primary" />
          <span className="italic font-bold text-lg tracking-wide">PD</span>
        </Link>

        {/* Right: Theme toggle and user dropdown */}
        <div className="flex items-center gap-2">
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
