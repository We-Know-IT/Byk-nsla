import { getEnabledModuleNavItems } from "../../shared/config/modules";
import { siteConfig } from "../../shared/config/site.config";
import { getEvents } from "../event/event-api";
import { getFrivilligkraftTeasers } from "../../frivilligkraft/frivilligkraft-api";
import { getSamhallsbyggeItems } from "../../samhallsbygge/samhallsbygge-api";
import FrivilligkraftCard from "../../frivilligkraft/components/frivilligkraft-card";
import SamhallsbyggeMap from "../../samhallsbygge/components/samhallsbygge-map";
import { filterAreaSamhallsbyggeItems } from "../../samhallsbygge/area-filter";
import AppTopbar from "../../shared/ui/app-topbar";
import EventCard from "../event/components/event-card";
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

const formatFrivilligkraftDate = (isoDate: string | null): string | null => {
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

export default async function StartPage() {
  const [
    { items: samhallsbyggeItems, error: samhallsbyggeError },
    { events, error: eventError },
    { teasers: frivilligkraftTeasers, error: frivilligkraftError },
  ] = await Promise.all([getSamhallsbyggeItems(), getEvents(), getFrivilligkraftTeasers()]);

  const areaItems = filterAreaSamhallsbyggeItems(samhallsbyggeItems);
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
  const startTeasers = frivilligkraftTeasers.slice(0, 3);

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
            <SectionHeader title="Hjälp någon med Frivilligkraft" withAction />
            <p className="sectionDescription">{sectionDescription}</p>
            <div className="samhallsbyggeMapShell">
              <SamhallsbyggeMap items={areaItems} />
            </div>
            {samhallsbyggeError ? (
              <div className="underConstructionCard" role="status">
                <p>{samhallsbyggeError}</p>
              </div>
            ) : null}
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

          <div className="pageSection">
            <SectionHeader title="Frivilligkraft nära dig" withAction />
            <p className="sectionDescription">{sectionDescription}</p>
            {frivilligkraftError ? (
              <div className="underConstructionCard" role="status">
                <p>{frivilligkraftError}</p>
              </div>
            ) : null}
            {!frivilligkraftError && startTeasers.length === 0 ? (
              <div className="underConstructionCard" role="status">
                <p>Inga frivilliguppdrag finns tillgängliga just nu.</p>
              </div>
            ) : null}
            {!frivilligkraftError && startTeasers.length > 0 ? (
              <div className="frivilligkraftGrid">
                {startTeasers.map((teaser) => (
                  <FrivilligkraftCard
                    key={teaser.id}
                    teaser={teaser}
                    dateLabel={formatFrivilligkraftDate(teaser.startDate)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
