"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import {
  changeEmailSchema,
  type ChangeEmailFormData,
} from "@/lib/validations/profile";

interface ChangeEmailFormProps {
  currentEmail: string;
}

export function ChangeEmailForm({ currentEmail }: ChangeEmailFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { email: currentEmail },
  });

  const onSubmit = async (values: ChangeEmailFormData) => {
    setServerError(null);
    setSuccess(false);

    if (values.email === currentEmail) {
      setServerError("This is already your current email");
      return;
    }

    const { error } = await authClient.changeEmail({
      newEmail: values.email,
      callbackURL: "/dashboard/profile",
    });

    if (error) {
      setServerError(error.message ?? "Something went wrong");
      return;
    }

    setSuccess(true);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" type="email" {...form.register("email")} />
        {form.formState.errors.email && (
          <p className="text-destructive text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {serverError && <p className="text-destructive text-sm">{serverError}</p>}
      {success && (
        <p className="text-primary text-sm">
          A confirmation link has been sent to your new email address
        </p>
      )}

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Sending..." : "Change email"}
      </Button>
    </form>
  );
}
