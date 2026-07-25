import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
}

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <>
      <Image
        src={siteConfig.logo.light}
        alt={siteConfig.name}
        height={40}
        width={40}
        className={cn("rounded-sm dark:hidden", className)}
      />
      <Image
        src={siteConfig.logo.dark}
        alt={siteConfig.name}
        width={40}
        height={40}
        className={cn("hidden rounded-sm dark:block", className)}
      />
    </>
  );
}
