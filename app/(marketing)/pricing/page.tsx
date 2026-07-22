import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { PricingCard } from "@/components/marketing/pricing-card";

export default async function PricingPage() {
  const [plans, session] = await Promise.all([
    prisma.plan.findMany({
      where: { active: true },
      orderBy: { price: "asc" },
    }),
    getSession(),
  ]);

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1>Simple, transparent pricing</h1>
        <p className="text-muted-foreground">
          Choose the plan that fits your needs. Cancel anytime.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} isAuthenticated={!!session} />
        ))}
      </div>
    </section>
  );
}
