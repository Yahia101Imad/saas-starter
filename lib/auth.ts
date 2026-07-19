import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { organization } from "better-auth/plugins";
import { sendEmail } from "@/lib/email/send-email";
// import { resend } from "@/lib/email/resend";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({ user, url }) => {
      console.log("=== SEND RESET PASSWORD ===");
      console.log(user.email);
      console.log(url);

      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `Click the link below:<br/><br/><a href="${url}">${url}</a>`,
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,

    // sendVerificationEmail: async ({ user, url }) => {
    //   await sendEmail({
    //     to: user.email,
    //     subject: "Verify your email",
    //     html: `Click the link below to verify your email:\n\n${url}`,
    //   });
    // },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  plugins: [organization()],
});
