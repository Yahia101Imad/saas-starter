"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  AuthCard,
  AuthDivider,
  AuthFooter,
  GoogleSignInButton,
} from "@/components/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";
import { authClient } from "@/lib/auth-client";

import { ForgotPasswordLink } from "@/components/auth/forgot-password-link";

// TODO:
// Use shadcn form (clean UI)
// npx shadcn@latest add form

export default function SignUpPage() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpFormData) => {
    const { data, error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
  };
  return (
    <AuthCard
      title="Create an account"
      description="Start building with SaaS Starter"
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>

          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...form.register("name")}
          />

          {form.formState.errors.name && (
            <p className="text-destructive text-sm">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...form.register("email")}
          />

          {form.formState.errors.email && (
            <p className="text-destructive text-sm">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>

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
          <ForgotPasswordLink />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>

          <Input
            id="confirm-password"
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

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>

      <div className="my-6">
        <AuthDivider />
      </div>

      <GoogleSignInButton />

      <div className="mt-6">
        <AuthFooter
          text="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
      </div>
    </AuthCard>
  );
}
