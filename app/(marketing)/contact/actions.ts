"use server";

import { contactSchema } from "@/lib/validations/contact";
import { sendEmail } from "@/lib/email/send-email";
import { contactRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/get-client-ip";

export async function submitContactForm(values: unknown) {
  const ip = await getClientIp();
  const { success } = await contactRateLimit.limit(ip);

  if (!success) {
    return {
      success: false,
      error: "Too many messages sent. Please try again later.",
    };
  }

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
