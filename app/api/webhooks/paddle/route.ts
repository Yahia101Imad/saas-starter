import { NextRequest, NextResponse } from "next/server";
import { paddle } from "@/lib/paddle/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("paddle-signature") ?? "";
  const rawBody = await req.text();
  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET!;

  let eventData;

  try {
    eventData = await paddle.webhooks.unmarshal(
      rawBody,
      webhookSecret,
      signature,
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 403 },
    );
  }

  if (!eventData) {
    return NextResponse.json({ error: "No event data" }, { status: 400 });
  }

  switch (eventData.eventType) {
    case "subscription.created":
    case "subscription.updated": {
      const sub = eventData.data;

      const plan = await prisma.plan.findFirst({
        where: { paddlePriceId: sub.items[0]?.price?.id },
      });

      const userId = sub.customData?.userId as string | undefined;

      if (!plan || !userId) break;

      await prisma.subscription.upsert({
        where: { paddleSubscriptionId: sub.id },
        update: {
          status: mapPaddleStatus(sub.status),
          currentPeriodStart: new Date(
            sub.currentBillingPeriod?.startsAt ?? Date.now(),
          ),
          currentPeriodEnd: new Date(
            sub.currentBillingPeriod?.endsAt ?? Date.now(),
          ),
          cancelAtPeriodEnd: !!sub.scheduledChange,
          planId: plan.id,
        },
        create: {
          paddleSubscriptionId: sub.id,
          paddleCustomerId: sub.customerId,
          userId,
          planId: plan.id,
          status: mapPaddleStatus(sub.status),
          currentPeriodStart: new Date(
            sub.currentBillingPeriod?.startsAt ?? Date.now(),
          ),
          currentPeriodEnd: new Date(
            sub.currentBillingPeriod?.endsAt ?? Date.now(),
          ),
        },
      });

      break;
    }

    case "subscription.canceled": {
      const sub = eventData.data;

      await prisma.subscription.updateMany({
        where: { paddleSubscriptionId: sub.id },
        data: { status: "CANCELED" },
      });

      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}

function mapPaddleStatus(
  status: string,
): "ACTIVE" | "CANCELED" | "PAST_DUE" | "TRIALING" | "INCOMPLETE" | "EXPIRED" {
  switch (status) {
    case "active":
      return "ACTIVE";
    case "canceled":
      return "CANCELED";
    case "past_due":
      return "PAST_DUE";
    case "trialing":
      return "TRIALING";
    case "paused":
      return "EXPIRED";
    default:
      return "INCOMPLETE";
  }
}
