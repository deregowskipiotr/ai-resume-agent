
import { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserAvatarProps = {
  user: { name: string; imageUrl: string };
} & ComponentProps<typeof Avatar>;

export function UserAvatar({
  user,
  ...props
}: UserAvatarProps) {
  // Get initials for fallback: take first letter of each word in the name
  const initials = user.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <Avatar {...props} className="size-9">
      <AvatarImage src={user.imageUrl} alt={user.name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;