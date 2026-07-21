import { getSession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="space-y-1">
      <h1>Hello, {session?.user.name}</h1>
      <p className="text-muted-foreground">{session?.user.email}</p>
    </div>
  );
}
