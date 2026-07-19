import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/send-email";

export async function GET() {
  const data = await sendEmail({
    to: "yahia0imadeddine@gmail.com",
    subject: "Resend Test",
    html: "Hello Imad! 🎉 Your email system is working.",
  });

  return NextResponse.json(data);
}
