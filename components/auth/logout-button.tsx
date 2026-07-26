"use client";

import type { ComponentProps } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-logout";

type LogoutButtonProps = ComponentProps<typeof Button>;

export function LogoutButton({
  variant = "destructive",
  ...props
}: LogoutButtonProps) {
  const { logout, isLoading } = useLogout();

  return (
    <Button variant={variant} onClick={logout} disabled={isLoading} {...props}>
      <LogOut className="h-4 w-4" />
      {isLoading ? "logging out..." : "logout"}
    </Button>
  );
}
