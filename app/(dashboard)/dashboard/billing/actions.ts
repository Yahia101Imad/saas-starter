"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { paddle } from "@/lib/paddle/server";

export async function getMySubscription() {
  const session = await getSession();
  if (!session) return null;

  return prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
      status: { in: ["ACTIVE", "TRIALING", "PAST_DUE"] },
    },
    include: { plan: true },
  });
}

export async function cancelMySubscription() {
  const session = await getSession();
  if (!session) return { success: false, error: "Not authenticated" };

  const subscription = await prisma.subscription.findFirst({
    where: { userId: session.user.id, status: { in: ["ACTIVE", "TRIALING"] } },
  });

  if (!subscription?.paddleSubscriptionId) {
    return { success: false, error: "No active subscription found" };
  }

  try {
    await paddle.subscriptions.update(subscription.paddleSubscriptionId, {
      scheduledChange: { action: "cancel", effectiveAt: "next_billing_period" },
    });
  } catch {
    return { success: false, error: "Failed to cancel subscription" };
  }

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: { cancelAtPeriodEnd: true },
  });

  revalidatePath("/dashboard/billing");
  return { success: true };
}
