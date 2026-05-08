import type { ModuleKey } from "../config/modules";
import { getEnabledModuleNavItems } from "../config/modules";
import { siteConfig } from "../config/site.config";
import SidebarNav from "../../modules/start/components/sidebar-nav";
import AppTopbar from "./app-topbar";

type UnderConstructionPageProps = {
  activeKey: ModuleKey;
  title: string;
};

export default function UnderConstructionPage({
  activeKey,
  title,
}: UnderConstructionPageProps) {
  return (
    <main className="screen">
      <AppTopbar />

      <div className="appBody">
        <SidebarNav items={getEnabledModuleNavItems()} activeKey={activeKey} />

        <section className="contentArea" aria-label={`${title} sida`}>
          <div className="underConstructionCard">
            <h1>{title}</h1>
            <p>{siteConfig.labels.underConstruction}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
