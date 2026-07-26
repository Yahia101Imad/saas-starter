import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  image?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: { className: "h-9 w-9 text-sm", px: 36 },
  md: { className: "h-12 w-12 text-base", px: 48 },
  lg: { className: "h-20 w-20 text-2xl", px: 80 },
};

export function UserAvatar({
  name,
  image,
  size = "md",
  className,
}: UserAvatarProps) {
  const { className: sizeClassName, px } = sizeConfig[size];

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={px}
        height={px}
        className={cn("rounded-full object-cover", sizeClassName, className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "bg-primary text-primary-foreground flex items-center justify-center rounded-full font-medium",
        sizeClassName,
        className,
      )}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
