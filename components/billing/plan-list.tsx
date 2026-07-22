"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CheckoutPanel } from "./checkout-panel";

interface Plan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  interval: string;
  paddlePriceId: string;
}

interface PlanListProps {
  plans: Plan[];
  userId: string;
  userEmail: string;
  preselectedPlanId?: string;
}

export function PlanList({
  plans,
  userId,
  userEmail,
  preselectedPlanId,
}: PlanListProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(
    plans.find((p) => p.id === preselectedPlanId) ?? null,
  );

  if (selectedPlan) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => setSelectedPlan(null)}>
          ← Back to plans
        </Button>
        <div>
          <h3>Subscribe to {selectedPlan.name}</h3>
          <p className="text-muted-foreground text-sm">
            Complete your payment details below
          </p>
        </div>
        <CheckoutPanel
          priceId={selectedPlan.paddlePriceId}
          userId={userId}
          userEmail={userEmail}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => {
        const formattedPrice = (plan.price / 100).toLocaleString("en-US", {
          style: "currency",
          currency: plan.currency,
          minimumFractionDigits: 0,
        });

        return (
          <Card key={plan.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              {plan.description && (
                <CardDescription>{plan.description}</CardDescription>
              )}
            </CardHeader>

            <CardContent className="flex-1">
              <span className="text-3xl font-semibold">{formattedPrice}</span>
              <span className="text-muted-foreground">/{plan.interval}</span>
            </CardContent>

            <CardFooter>
              <Button className="w-full" onClick={() => setSelectedPlan(plan)}>
                Subscribe
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
