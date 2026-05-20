import { AdminSectionPage, adminNavItems } from "../../modules/admin";

export default function Page() {
  return <AdminSectionPage activeKey="notiser" navItems={adminNavItems} />;
}
