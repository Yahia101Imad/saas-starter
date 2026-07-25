"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { dashboardNavItems } from "./nav-items";
import { SiteLogo } from "@/components/shared/site-logo";
import { useSidebarState } from "@/hooks/use-sidebar-state";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { isPinned, isExpanded, togglePin, setIsHovered } = useSidebarState();

  return (
    <>
      <div
        className={cn(
          "hidden shrink-0 transition-all duration-200 md:block",
          isPinned ? "w-64" : "w-16",
        )}
      />

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "bg-background fixed inset-y-0 left-0 z-40 hidden flex-col border-r transition-all duration-200 md:flex",
          isExpanded ? "w-64" : "w-16",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className={cn("overflow-hidden", !isExpanded && "opacity-0")}>
            <SiteLogo />
          </div>

          {isExpanded && (
            <button
              onClick={togglePin}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-7 w-7 items-center justify-center rounded-md"
              title={isPinned ? "Collapse sidebar" : "Keep sidebar open"}
            >
              {isPinned ? (
                <PanelLeftClose className="h-4 w-4" />
              ) : (
                <PanelLeft className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {dashboardNavItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span
                  className={cn(
                    "overflow-hidden whitespace-nowrap transition-opacity duration-200",
                    isExpanded ? "opacity-100" : "w-0 opacity-0",
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
