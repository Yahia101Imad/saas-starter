"use client";

import { Button } from "@/components/ui/button";

import { AuthCard, AuthFooter } from "@/components/auth";

export default function VerifyEmailPage() {
  const handleResend = async () => {
    // TODO:
    // await authClient.sendVerificationEmail(...)
  };

  return (
    <AuthCard
      title="Verify your email"
      description="We've sent a verification link to your email address."
    >
      <div className="space-y-6">
        <p className="text-muted-foreground text-center text-sm">
          Check your inbox and click the verification link to activate your
          account.
        </p>

        <Button className="w-full" onClick={handleResend}>
          Resend verification email
        </Button>

        <AuthFooter
          text="Already verified?"
          linkText="Sign in"
          href="/sign-in"
        />
      </div>
    </AuthCard>
  );
}
