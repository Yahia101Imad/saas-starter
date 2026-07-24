import { prisma } from "@/lib/db";

export default async function AdminOverviewPage() {
  const [userCount, activeSubscriptionCount, totalRevenue] = await Promise.all([
    prisma.user.count(),
    prisma.subscription.count({ where: { status: "ACTIVE" } }),
    prisma.subscription.findMany({
      where: { status: "ACTIVE" },
      include: { plan: true },
    }),
  ]);

  const mrr = totalRevenue.reduce((sum, sub) => sum + sub.plan.price, 0) / 100;

  return (
    <div className="space-y-6">
      <div>
        <h1>Overview</h1>
        <p className="text-muted-foreground">A quick look at your product</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-md border p-6">
          <p className="text-muted-foreground text-sm">Total users</p>
          <p className="text-3xl font-semibold">{userCount}</p>
        </div>

        <div className="rounded-md border p-6">
          <p className="text-muted-foreground text-sm">Active subscriptions</p>
          <p className="text-3xl font-semibold">{activeSubscriptionCount}</p>
        </div>

        <div className="rounded-md border p-6">
          <p className="text-muted-foreground text-sm">Estimated MRR</p>
          <p className="text-3xl font-semibold">${mrr.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
