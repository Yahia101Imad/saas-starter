"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cancelMySubscription } from "@/app/(dashboard)/dashboard/billing/actions";

interface SubscriptionCardProps {
  subscription: {
    status: string;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    plan: { name: string; price: number; currency: string; interval: string };
  };
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const formattedPrice = (subscription.plan.price / 100).toLocaleString(
    "en-US",
    {
      style: "currency",
      currency: subscription.plan.currency,
      minimumFractionDigits: 0,
    },
  );

  const formattedDate = subscription.currentPeriodEnd.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const handleCancel = () => {
    setError(null);
    startTransition(async () => {
      const result = await cancelMySubscription();
      if (!result.success) {
        setError(result.error ?? "Failed to cancel subscription");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{subscription.plan.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-muted-foreground text-sm">
          <p>
            {formattedPrice}/{subscription.plan.interval} · Status:{" "}
            <span className="text-foreground">{subscription.status}</span>
          </p>
          <p>
            {subscription.cancelAtPeriodEnd
              ? `Cancels on ${formattedDate}`
              : `Renews on ${formattedDate}`}
          </p>
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        {!subscription.cancelAtPeriodEnd && (
          <Button variant="outline" onClick={handleCancel} disabled={isPending}>
            {isPending ? "Canceling..." : "Cancel subscription"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
