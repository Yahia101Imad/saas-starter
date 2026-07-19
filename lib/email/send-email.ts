import { resend } from "./resend";

type SendEmailProps = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  return resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    html,
  });
}
