import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export async function requireAdmin() {
  const session = await getSession();

  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  return session;
}
