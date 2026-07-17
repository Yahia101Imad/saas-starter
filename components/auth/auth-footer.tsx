import Link from "next/link";

type AuthFooterProps = {
  text: string;
  linkText: string;
  href: string;
};

export function AuthFooter({ text, linkText, href }: AuthFooterProps) {
  return (
    <p className="text-muted-foreground text-center text-sm">
      {text}{" "}
      <Link href={href} className="text-foreground font-medium hover:underline">
        {linkText}
      </Link>
    </p>
  );
}
