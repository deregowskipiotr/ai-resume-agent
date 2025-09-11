"use client"

import React from "react";
import { ThemeToggle } from "@/components/ui/ThemesToggle";
import { BrainCircuitIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useClerk, SignOutButton } from "@clerk/nextjs";



export function Navbar({ user }: { user: {name: string; imageUrl: string } }) {
  const { openUserProfile } = useClerk();

  // Get initials for fallback: take first letter of each word in the name
  const initials = user.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <nav className="h-header border-b-[1px]">
      <div className="container flex h-full items-center justify-between">
        {/* Left: App logo and name */}
        <div className="flex items-center gap-3">
          <BrainCircuitIcon className="h-7 w-7 text-primary" />
          <span className="font-bold text-lg tracking-wide">PD</span>
        </div>

        {/* Right: Theme toggle and user dropdown */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button aria-label="User menu" className="focus:outline-none">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.imageUrl} alt={user.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => openUserProfile()}
                className="cursor-pointer"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer text-primary-foreground">
                <SignOutButton redirectUrl="/" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
