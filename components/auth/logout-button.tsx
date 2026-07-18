"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();

    router.push("/sign-in");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-destructive text-destructive-foreground rounded-md px-4 py-2 transition-opacity hover:opacity-90"
    >
      Logout
    </button>
  );
}
