"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { AuthCard } from "@/components/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validations/auth";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  if (!token) {
    return (
      <AuthCard
        title="Invalid or expired link"
        description="This password reset link is invalid or has expired."
      >
        <Button className="w-full" asChild>
          <Link href="/forgot-password">Request a new link</Link>
        </Button>
      </AuthCard>
    );
  }

  const onSubmit = async (values: ResetPasswordFormData) => {
    const { error } = await authClient.resetPassword({
      newPassword: values.password,
      token,
    });

    if (error) {
      toast.error(
        error.message ??
          "This link may have expired. Please request a new one.",
      );
      return;
    }

    toast.success("Password reset successfully. You can now sign in.");
    router.push("/sign-in");
  };

  return (
    <AuthCard
      title="Reset your password"
      description="Enter your new password below."
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-destructive text-sm">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-destructive text-sm">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Resetting..." : "Reset password"}
        </Button>
      </form>
    </AuthCard>
  );
}
