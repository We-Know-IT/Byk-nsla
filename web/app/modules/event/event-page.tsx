import { getEnabledModuleNavItems } from "../../shared/config/modules";
import { siteConfig } from "../../shared/config/site.config";
import AppTopbar from "../../shared/ui/app-topbar";
import SidebarNav from "../start/components/sidebar-nav";
import EventGridCard from "./components/event-grid-card";
import EventToolbar from "./components/event-toolbar";
import type { EventGridCardData } from "./model/data";
import { eventFilters, eventMonth } from "./model/data";

type EventPageProps = {
  cards: EventGridCardData[];
  listError: string | null;
};

export default function EventPage({ cards, listError }: EventPageProps) {
  return (
    <main className="screen">
      <AppTopbar />

      <div className="appBody">
        <SidebarNav items={getEnabledModuleNavItems()} activeKey="event" />

        <section className="contentArea eventPage" aria-label="Eventsida">
          <h1 className="eventPageTitle">Event i {siteConfig.areaName}</h1>
          <EventToolbar filters={eventFilters} month={eventMonth} />

          {listError ? (
            <div className="underConstructionCard" role="status">
              <p>{listError}</p>
              <p>Visar exempeldata tills tjänsten är tillgänglig.</p>
            </div>
          ) : null}

          <div className="eventGrid">
            {cards.map((card) => (
              <EventGridCard key={card.id} card={card} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
