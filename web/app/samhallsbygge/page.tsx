import { getEnabledModuleNavItems } from "../shared/config/modules";
import { siteConfig } from "../shared/config/site.config";
import AppTopbar from "../shared/ui/app-topbar";
import SidebarNav from "../modules/start/components/sidebar-nav";
import SamhallsbyggeCard from "./components/samhallsbygge-card";
import SamhallsbyggeMap from "./components/samhallsbygge-map";
import { filterLineroSamhallsbyggeItems } from "./linero-filter";
import { getSamhallsbyggeItems } from "./samhallsbygge-api";

const MONTH_LABEL = "Mars";

export default async function SamhallsbyggePage() {
  const { items, error } = await getSamhallsbyggeItems();
  const lineroItems = filterLineroSamhallsbyggeItems(items);

  return (
    <main className="screen">
      <AppTopbar />

      <div className="appBody">
        <SidebarNav items={getEnabledModuleNavItems()} activeKey="samhallsbygge" />

        <section className="contentArea samhallsbyggePage" aria-label="Samhällsbyggnadssida">
          <div className="samhallsbyggeHeader">
            <h1 className="eventPageTitle">Samhällsbyggande tillstånd i {siteConfig.areaName}</h1>

            <div className="samhallsbyggeTopTools">
              <button type="button" className="samhallsbyggeIconButton" aria-label="Föregående">
                ←
              </button>
              <button type="button" className="samhallsbyggeMonthButton">
                {MONTH_LABEL} <span aria-hidden="true">▾</span>
              </button>
              <button type="button" className="samhallsbyggeIconButton" aria-label="Nästa">
                →
              </button>
            </div>
          </div>

          <div className="samhallsbyggeToolbar">
            <button type="button" className="samhallsbyggeChip">
              Kategori <span aria-hidden="true">▾</span>
            </button>
            <button type="button" className="samhallsbyggeChip">
              Tid <span aria-hidden="true">▾</span>
            </button>
            <button type="button" className="samhallsbyggeChip">
              Datum <span aria-hidden="true">▾</span>
            </button>
          </div>

          <div className="samhallsbyggeMapShell">
            <SamhallsbyggeMap items={lineroItems} />
          </div>

          {error ? (
            <div className="underConstructionCard">
              <p>{error}</p>
            </div>
          ) : null}

          {!error && lineroItems.length === 0 ? (
            <div className="underConstructionCard">
              <p>Inga samhällsbyggnadsärenden hittades för Linero just nu.</p>
            </div>
          ) : null}

          {!error && lineroItems.length > 0 ? (
            <div className="samhallsbyggeGrid">
              {lineroItems.map((item) => (
                <SamhallsbyggeCard key={item.id} item={item} />
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
