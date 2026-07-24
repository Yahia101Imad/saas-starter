import { prisma } from "@/lib/db";

export default async function AdminSubscriptionsPage() {
  const subscriptions = await prisma.subscription.findMany({
    orderBy: { createdAt: "desc" },
    include: { plan: true, user: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1>Subscriptions</h1>
        <p className="text-muted-foreground">{subscriptions.length} total</p>
      </div>

      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b text-left">
            <tr>
              <th className="p-3 font-medium">User</th>
              <th className="p-3 font-medium">Plan</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Renews / Cancels</th>
              <th className="p-3 font-medium">Started</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="border-b last:border-0">
                <td className="p-3">
                  <div className="flex flex-col">
                    <span>{sub.user.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {sub.user.email}
                    </span>
                  </div>
                </td>
                <td className="text-muted-foreground p-3">{sub.plan.name}</td>
                <td className="p-3">
                  <span
                    className={
                      sub.status === "ACTIVE"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    {sub.status}
                  </span>
                </td>
                <td className="text-muted-foreground p-3">
                  {sub.currentPeriodEnd.toLocaleDateString("en-US")}
                  {sub.cancelAtPeriodEnd && " (canceling)"}
                </td>
                <td className="text-muted-foreground p-3">
                  {sub.createdAt.toLocaleDateString("en-US")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
