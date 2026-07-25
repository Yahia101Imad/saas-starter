"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
  const form = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { email: currentEmail },
  });

  const onSubmit = async (values: ChangeEmailFormData) => {
    if (values.email === currentEmail) {
      toast.error("This is already your current email");
      return;
    }

    const { error } = await authClient.changeEmail({
      newEmail: values.email,
      callbackURL: "/dashboard/profile",
    });

    if (error) {
      toast.error(error.message ?? "Something went wrong");
      return;
    }

    toast.success(
      "A confirmation link has been sent to your new email address",
    );
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

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Sending..." : "Change email"}
      </Button>
    </form>
  );
}
