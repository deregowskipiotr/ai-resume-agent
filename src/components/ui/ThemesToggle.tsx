"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

const themes = [
  {
    key: "light",
    label: "Light",
    Icon: Sun,
  },
  {
    key: "dark",
    label: "Dark",
    Icon: Moon,
  },
  {
    key: "system",
    label: "System",
    Icon: Monitor,
  },
];

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null; // Avoid hydration mismatch

  // Find the active theme for icon in the trigger button
  const activeThemeObj =
    themes.find((item) => item.key === theme) ||
    themes.find((item) => item.key === "system");
  const ActiveIcon = activeThemeObj?.Icon ?? Monitor;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center p-2 cursor-pointer"
          aria-label="Toggle theme"
        >
          <ActiveIcon size={20} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-900">
        {themes.map(({ key, label, Icon }) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key)}
            className="flex items-center gap-2 p-2 cursor-pointer"
          >
            <Icon size={16} /> {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
