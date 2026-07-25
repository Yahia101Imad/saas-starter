import { Users } from "lucide-react";
import { prisma } from "@/lib/db";
import { UserAvatar } from "@/components/shared/user-avatar";
import { EmptyState } from "@/components/shared/empty-state";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      subscriptions: { where: { status: "ACTIVE" }, include: { plan: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1>Users</h1>
        <p className="text-muted-foreground">{users.length} total</p>
      </div>

      {users.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users yet"
          description="Users will appear here once they sign up."
        />
      ) : (
        <div className="overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b text-left">
              <tr>
                <th className="p-3 font-medium">User</th>
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Verified</th>
                <th className="p-3 font-medium">Plan</th>
                <th className="p-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b last:border-0">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <UserAvatar
                        name={user.name}
                        image={user.image}
                        size="sm"
                      />
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground p-3">{user.email}</td>
                  <td className="p-3">
                    {user.emailVerified ? (
                      <span className="text-primary">Yes</span>
                    ) : (
                      <span className="text-muted-foreground">No</span>
                    )}
                  </td>
                  <td className="text-muted-foreground p-3">
                    {user.subscriptions[0]?.plan.name ?? "—"}
                  </td>
                  <td className="text-muted-foreground p-3">
                    {user.createdAt.toLocaleDateString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
