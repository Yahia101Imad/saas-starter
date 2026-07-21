"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { updateThemeSchema } from "@/lib/validations/settings";

export async function updateTheme(theme: "LIGHT" | "DARK" | "SYSTEM") {
  const session = await getSession();

  if (!session) {
    return { success: false, error: "Not authenticated" };
  }

  const parsed = updateThemeSchema.safeParse({ theme });

  if (!parsed.success) {
    return { success: false, error: "Invalid theme value" };
  }

  await prisma.userSettings.upsert({
    where: { userId: session.user.id },
    update: { theme: parsed.data.theme },
    create: {
      userId: session.user.id,
      theme: parsed.data.theme,
    },
  });

  return { success: true };
}
