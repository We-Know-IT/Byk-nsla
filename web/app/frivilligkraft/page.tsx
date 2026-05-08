import { getEnabledModuleNavItems } from "../shared/config/modules";
import { siteConfig } from "../shared/config/site.config";
import AppTopbar from "../shared/ui/app-topbar";
import SidebarNav from "../modules/start/components/sidebar-nav";
import { getFrivilligkraftTeasers } from "./frivilligkraft-api";
import FrivilligkraftCard from "./components/frivilligkraft-card";

const formatDate = (isoDate: string | null): string | null => {
  if (!isoDate) {
    return null;
  }

  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
};

export default async function FrivilligkraftPage() {
  const { teasers, error } = await getFrivilligkraftTeasers();

  return (
    <main className="screen">
      <AppTopbar />

      <div className="appBody">
        <SidebarNav items={getEnabledModuleNavItems()} activeKey="frivilligkraft" />

        <section className="contentArea frivilligkraftPage" aria-label="Frivilligkraftsida">
          <div className="frivilligkraftHeader">
            <h1 className="eventPageTitle">
              Frivilligkraft - volontäruppdrag i {siteConfig.areaName}
            </h1>

            <div className="frivilligkraftTopTools">
              <button type="button" className="frivilligkraftIconButton" aria-label="Föregående">
                ←
              </button>
              <button type="button" className="frivilligkraftMonthButton">
                Mars <span aria-hidden="true">▾</span>
              </button>
              <button type="button" className="frivilligkraftIconButton" aria-label="Nästa">
                →
              </button>
            </div>
          </div>

          <div className="frivilligkraftToolbar">
            <button type="button" className="frivilligkraftChip">
              Uppdragskategori <span aria-hidden="true">▾</span>
            </button>
            <button type="button" className="frivilligkraftChip">
              Tid <span aria-hidden="true">▾</span>
            </button>
            <button type="button" className="frivilligkraftChip">
              Datum <span aria-hidden="true">▾</span>
            </button>
          </div>

          {error ? (
            <div className="underConstructionCard">
              <p>{error}</p>
            </div>
          ) : null}

          {!error && teasers.length === 0 ? (
            <div className="underConstructionCard">
              <p>Inga frivilliguppdrag finns tillgängliga just nu.</p>
            </div>
          ) : null}

          {!error && teasers.length > 0 ? (
            <div className="frivilligkraftGrid">
              {teasers.map((teaser) => {
                const dateLabel = formatDate(teaser.startDate);

                return <FrivilligkraftCard key={teaser.id} teaser={teaser} dateLabel={dateLabel} />;
              })}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
