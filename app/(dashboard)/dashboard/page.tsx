import { LogoutButton } from "@/components/auth/logout-button";

export default function DashboardPage() {
  return (
    <div className="space-y-2">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>

      <LogoutButton />
    </div>
  );
}
