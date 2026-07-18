"use client";

import Link from "next/link";

// TODO:
// add "Resend" later, as Mail Provider
// expected:
// user add email => click send => click link in mail of reset password page.

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6">
      <div className="w-full space-y-6">
        <div className="space-y-2 text-center">
          <h1>Forgot password?</h1>

          <p className="text-muted-foreground">
            Enter your email and we&apos;ll send you a password reset link.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="border-input bg-background w-full rounded-md border px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-primary-foreground w-full rounded-md py-2"
          >
            Send reset link
          </button>
        </form>

        <p className="text-center text-sm">
          Remember your password?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
