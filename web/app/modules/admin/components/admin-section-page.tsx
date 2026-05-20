import AppTopbar from "../../../shared/ui/app-topbar";
import SidebarNav, { type SidebarNavItem } from "../../../modules/start/components/sidebar-nav";

type AdminSectionPageProps = {
  activeKey: string;
  navItems: readonly SidebarNavItem[];
};

export default function AdminSectionPage({ activeKey, navItems }: AdminSectionPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <AppTopbar />

      <div className="flex min-h-[calc(100vh-66px)] max-[980px]:flex-col">
        <SidebarNav items={navItems} activeKey={activeKey} ariaLabel="Adminnavigation" />

        <section className="flex flex-1 flex-col px-4 pb-8 pt-4" aria-label="Admin">
        </section>
      </div>
    </main>
  );
}
