"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { submitContactForm } from "@/app/(marketing)/contact/actions";

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: ContactFormData) => {
    setServerError(null);
    setSuccess(false);

    const result = await submitContactForm(values);

    if (!result.success) {
      setServerError(result.error ?? "Something went wrong");
      return;
    }

    setSuccess(true);
    form.reset();
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

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...form.register("email")} />
        {form.formState.errors.email && (
          <p className="text-destructive text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          rows={5}
          className="border-input focus-visible:ring-ring w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2"
          {...form.register("message")}
        />
        {form.formState.errors.message && (
          <p className="text-destructive text-sm">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      {serverError && <p className="text-destructive text-sm">{serverError}</p>}
      {success && (
        <p className="text-primary text-sm">
          Message sent! We&apos;ll get back to you soon.
        </p>
      )}

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
