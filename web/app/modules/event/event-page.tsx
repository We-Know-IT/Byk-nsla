import { getEnabledModuleNavItems } from "../../shared/config/modules";
import { siteConfig } from "../../shared/config/site.config";
import AppTopbar from "../../shared/ui/app-topbar";
import SidebarNav from "../start/components/sidebar-nav";
import EventListingClient from "./components/event-listing-client";
import type { EventGridCardData } from "./model/data";

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

          {listError ? (
            <div className="underConstructionCard" role="status">
              <p>{listError}</p>
              <p>Visar exempeldata tills tjänsten är tillgänglig.</p>
            </div>
          ) : null}

          <EventListingClient cards={cards} />
        </section>
      </div>
    </main>
  );
}
