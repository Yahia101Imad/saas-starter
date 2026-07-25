"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "@/lib/validations/profile";

interface ProfileFormProps {
  user: { name: string };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();

  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user.name },
  });

  const onSubmit = async (values: UpdateProfileFormData) => {
    const { error } = await authClient.updateUser({ name: values.name });

    if (error) {
      toast.error(
        error.message ?? "Something went wrong while updating your profile",
      );
      return;
    }

    toast.success("Profile updated successfully");
    router.refresh();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...form.register("name")} />
        {form.formState.errors.name && (
          <p className="text-destructive text-sm">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
