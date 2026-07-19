import { resend } from "./resend";

type SendEmailProps = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev", // from: "noreply@yourdomain.com"
      to,
      subject,
      html,
    });

    return result;
  } catch (error) {
    throw error;
  }
}
