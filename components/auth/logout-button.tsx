"use client";

import { LogOut } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-logout";

export function LogoutButton({
  variant = "destructive",
  ...props
}: ButtonProps) {
  const { logout, isLoading } = useLogout();

  return (
    <Button variant={variant} onClick={logout} disabled={isLoading} {...props}>
      <LogOut className="h-4 w-4" />
      {isLoading ? "جارٍ الخروج..." : "تسجيل الخروج"}
    </Button>
  );
}
