import { AdminSectionPage, adminNavItems } from "./index";

export default function AdminPage() {
  return <AdminSectionPage activeKey="dashboard" navItems={adminNavItems} />;
}
