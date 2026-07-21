import type { ReactNode } from "react";
import { requireAuth } from "@/components/auth/auth-guard";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { UserMenu } from "@/components/dashboard/user-menu";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAuth();

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-end border-b px-6">
          <UserMenu name={session.user.name} email={session.user.email} />
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
