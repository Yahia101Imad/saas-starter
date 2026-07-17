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
import { signInSchema, type SignInFormData } from "@/lib/validations/auth";

// TODO:
// Use shadcn form (clean UI)
// npx shadcn@latest add form

export default function SignInPage() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInFormData) => {
    console.log(values);
  };
  return (
    <AuthCard title="Welcome back" description="Sign in to your account">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        </div>

        <Button className="w-full">Sign In</Button>
      </form>

      <div className="my-6">
        <AuthDivider />
      </div>

      <GoogleSignInButton />

      <div className="mt-6">
        <AuthFooter
          text="Don't have an account?"
          linkText="Create one"
          href="/sign-up"
        />
      </div>
    </AuthCard>
  );
}
