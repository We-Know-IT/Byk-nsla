import { getEnabledModuleNavItems } from "../../shared/config/modules";
import { siteConfig } from "../../shared/config/site.config";
import { getEvents } from "../event/event-api";
import AppTopbar from "../../shared/ui/app-topbar";
import EventCard from "../event/components/event-card";
import MapView from "./components/map-view";
import SectionHeader from "../../shared/ui/section-header";
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
    <main className="min-h-screen bg-background">
      <AppTopbar />

      <div className="flex min-h-[calc(100vh-66px)] max-[980px]:flex-col">
        <SidebarNav items={getEnabledModuleNavItems()} activeKey="start" />

        <section
          className="flex flex-1 flex-col gap-[22px] px-4 pb-8 pt-4"
          aria-label="Startsida"
        >
          <div className="flex flex-col gap-2">
            <SectionHeader title="Just nu" as="h1" />
            <p className="m-0 text-sm leading-tight text-foreground-muted">{sectionDescription}</p>
            <div className="grid grid-cols-3 gap-3 max-[980px]:grid-cols-1">
              {spotlightCards.map((card) => (
                <SpotlightCard key={card.id} card={card} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <SectionHeader title="Kartan" withAction />
            <p className="m-0 text-sm leading-tight text-foreground-muted">{sectionDescription}</p>
            <MapView />
          </div>

          <div className="flex flex-col gap-2">
            <SectionHeader title={`Vad händer i ${siteConfig.areaName} idag?`} withAction />
            <p className="m-0 text-sm leading-tight text-foreground-muted">{sectionDescription}</p>
            {eventError ? (
              <div
                className="max-w-[520px] rounded-[10px] border border-border bg-surface p-[22px] shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
                role="status"
              >
                <p>{eventError}</p>
                <p>Visar exempeldata tills tjänsten är tillgänglig.</p>
              </div>
            ) : null}
            <div className="grid auto-cols-[188px] grid-flow-col gap-2 overflow-x-auto pb-0.5">
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
