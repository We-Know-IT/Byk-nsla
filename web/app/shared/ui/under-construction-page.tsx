import type { ModuleKey } from "../config/modules";
import { getEnabledModuleNavItems } from "../config/modules";
import { siteConfig } from "../config/site.config";
import SidebarNav from "../../modules/start/components/sidebar-nav";
import AppTopbar from "./app-topbar";

type UnderConstructionPageProps = {
  activeKey: ModuleKey;
  title: string;
};

export default async function UnderConstructionPage({
  activeKey,
  title,
}: UnderConstructionPageProps) {
  const navItems = await getEnabledModuleNavItems();
  return (
    <main className="min-h-screen bg-background">
      <AppTopbar />

      <div className="flex min-h-[calc(100vh-66px)] max-[980px]:flex-col">
        <SidebarNav items={navItems} activeKey={activeKey} />

        <section
          className="flex flex-1 flex-col gap-[22px] px-4 pb-8 pt-4"
          aria-label={`${title} sida`}
        >
          <div className="max-w-[520px] rounded-[10px] border border-border bg-surface p-[22px] shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_h1]:mb-2 [&_h1]:mt-0 [&_h1]:text-[28px] [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:text-foreground [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted">
            <h1>{title}</h1>
            <p>{siteConfig.labels.underConstruction}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
