import { AdminSectionPage, adminNavItems } from "../../modules/admin";

export default function Page() {
  return <AdminSectionPage activeKey="dashboard" navItems={adminNavItems} />;
}
