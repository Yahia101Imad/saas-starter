import {
  LayoutDashboard,
  User,
  Settings,
  // Building2,
  // Users,
  CreditCard,
} from "lucide-react";

export const dashboardNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Profile", href: "/dashboard/profile", icon: User },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
  // { title: "Organization", href: "/dashboard/organization", icon: Building2 },
  // { title: "Members", href: "/dashboard/members", icon: Users },
  { title: "Billing", href: "/dashboard/billing", icon: CreditCard },
];
