import { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  user: { name?: string; imageUrl?: string };
} & ComponentProps<typeof Avatar>;

export function UserAvatar({ user, className, ...props }: UserAvatarProps) {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <Avatar {...props} className={cn("size-9", className)}>
      <AvatarImage
        src={user?.imageUrl || ""}
        alt={user?.name || "User"}
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
