import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { sendEmail } from "@/lib/email/send-email";

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

  user: {
    changeEmail: {
      enabled: false,
      sendChangeEmailVerification: async ({
        user,
        newEmail,
        url,
      }: {
        user: { email: string };
        newEmail: string;
        url: string;
      }) => {
        console.log("=== SEND CHANGE EMAIL VERIFICATION ===");
        console.log("to:", newEmail);
        console.log("url:", url);
        await sendEmail({
          to: newEmail,
          subject: "Verify your new email address",
          html: `Click the link below to confirm your new email address:<br/><br/><a href="${url}">${url}</a>`,
        });
      },
    },
  },

  emailVerification: {
    sendOnSignUp: true,

    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        html: `Click the link below to verify your email address:<br/><br/><a href="${url}">${url}</a>`,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
