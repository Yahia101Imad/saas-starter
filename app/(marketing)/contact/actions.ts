"use server";

import { contactSchema } from "@/lib/validations/contact";
import { sendEmail } from "@/lib/email/send-email";

export async function submitContactForm(values: unknown) {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  const { name, email, message } = parsed.data;

  await sendEmail({
    to: process.env.CONTACT_EMAIL ?? "support@example.com",
    subject: `New contact form message from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  return { success: true };
}
