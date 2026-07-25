import { Package } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { getMySubscription } from "./actions";
import { PlanList } from "@/components/billing/plan-list";
import { SubscriptionCard } from "@/components/billing/subscription-card";
import { EmptyState } from "@/components/shared/empty-state";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const session = await getSession();
  const user = session!.user;
  const { plan: preselectedPlanId } = await searchParams;

  const subscription = await getMySubscription();

  if (subscription) {
    return (
      <div className="max-w-lg space-y-6">
        <div>
          <h1>Billing</h1>
          <p className="text-muted-foreground">Manage your subscription</p>
        </div>
        <SubscriptionCard subscription={subscription} />
      </div>
    );
  }

  const plans = await prisma.plan.findMany({
    where: { active: true },
    orderBy: { price: "asc" },
  });

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1>Billing</h1>
        <p className="text-muted-foreground">Choose a plan to get started</p>
      </div>

      {plans.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No plans available yet"
          description="We're setting things up. Please check back soon."
        />
      ) : (
        <PlanList
          plans={plans}
          userId={user.id}
          userEmail={user.email}
          preselectedPlanId={preselectedPlanId}
        />
      )}
    </div>
  );
}
