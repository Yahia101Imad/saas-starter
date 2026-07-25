"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordFormData) => {
    const { error } = await authClient.requestPasswordReset({
      email: values.email,
      redirectTo: "/reset-password",
    });

    if (error) {
      toast.error(error.message ?? "Something went wrong. Please try again.");
      return;
    }

    toast.success("If an account exists, a reset link has been sent.");
    form.reset();
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6">
      <div className="w-full space-y-6">
        <div className="space-y-2 text-center">
          <h1>Forgot password?</h1>
          <p className="text-muted-foreground">
            Enter your email and we&apos;ll send you a password reset link.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
              className="border-input bg-background w-full rounded-md border px-3 py-2"
            />
            {form.formState.errors.email && (
              <p className="text-destructive text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Sending..." : "Send reset link"}
          </Button>
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
