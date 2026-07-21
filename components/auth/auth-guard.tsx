import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return session;
}
