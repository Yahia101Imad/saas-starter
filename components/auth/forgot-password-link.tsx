import Link from "next/link";

export function ForgotPasswordLink() {
  return (
    <div className="flex justify-end">
      <Link
        href="/forgot-password"
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        Forgot password?
      </Link>
    </div>
  );
}
