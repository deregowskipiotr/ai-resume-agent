import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";


export function BackLink({
  href,
  children, 
  classname,
}: {
  href: string;
  children: React.ReactNode;
  classname?: string;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn("-ml-3", classname)}
    >
      <Link
        href={href}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeftIcon />
        {children}
      </Link>
    </Button>
  );
}