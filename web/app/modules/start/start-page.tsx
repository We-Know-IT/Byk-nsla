import { getEnabledModuleNavItems } from "../../shared/config/modules";
import { siteConfig } from "../../shared/config/site.config";
import { getEvents } from "../event/event-api";
import AppTopbar from "../../shared/ui/app-topbar";
import EventCard from "../event/components/event-card";
import MapView from "./components/map-view";
import SectionHeader from "./components/section-header";
import SidebarNav from "./components/sidebar-nav";
import SpotlightCard from "./components/spotlight-card";
import { cityCards, sectionDescription, spotlightCards } from "./model/data";

const formatStartEventDate = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const hasTime = value.includes("T") && /\d{2}:\d{2}/.test(value);
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    ...(hasTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(parsed);
};

export default async function StartPage() {
  const { events, error: eventError } = await getEvents();

  const eventCards =
    !eventError && events.length > 0
      ? events.slice(0, 6).map((event) => ({
          id: event.id,
          title: event.title,
          date: formatStartEventDate(event.date),
          text: event.description,
          cta: event.url ? "Mer info" : "Knapp",
          imageSrc: event.imageUrl,
          eventUrl: event.url,
        }))
      : cityCards;

  return (
    <main className="screen">
      <AppTopbar />

      <div className="appBody">
        <SidebarNav items={getEnabledModuleNavItems()} activeKey="start" />

        <section className="contentArea" aria-label="Startsida">
          <div className="pageSection">
            <SectionHeader title="Just nu" as="h1" />
            <p className="sectionDescription">{sectionDescription}</p>
            <div className="spotlightRow">
              {spotlightCards.map((card) => (
                <SpotlightCard key={card.id} card={card} />
              ))}
            </div>
          </div>

          <div className="pageSection">
            <SectionHeader title="Kartan" withAction />
            <p className="sectionDescription">{sectionDescription}</p>
            <MapView />
          </div>

          <div className="pageSection">
            <SectionHeader title={`Vad händer i ${siteConfig.areaName} idag?`} withAction />
            <p className="sectionDescription">{sectionDescription}</p>
            {eventError ? (
              <div className="underConstructionCard" role="status">
                <p>{eventError}</p>
                <p>Visar exempeldata tills tjänsten är tillgänglig.</p>
              </div>
            ) : null}
            <div className="cardRow">
              {eventCards.map((card) => (
                <EventCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
