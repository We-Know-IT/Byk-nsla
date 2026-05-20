import type { SidebarNavItem } from "../../../modules/start/components/sidebar-nav";

export const adminNavItems = [
  { key: "dashboard", label: "Dashboard", href: "/admin" },
  { key: "installningar", label: "Inställningar", href: "/admin/installningar" },
  { key: "statistik", label: "Statistik", href: "/admin/statistik" },
  { key: "notiser", label: "Notiser", href: "/admin/notiser" },
] as const satisfies readonly SidebarNavItem[];
