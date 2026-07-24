import type { ReactNode } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/admin" className="font-semibold">
            Admin Panel
          </Link>

          <nav className="text-muted-foreground flex items-center gap-6 text-sm">
            <Link href="/admin/users" className="hover:text-foreground">
              Users
            </Link>
            <Link href="/admin/subscriptions" className="hover:text-foreground">
              Subscriptions
            </Link>
            <Link href="/dashboard" className="hover:text-foreground">
              ← Back to app
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
