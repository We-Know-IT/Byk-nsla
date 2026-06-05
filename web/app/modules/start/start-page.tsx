import { getEnabledModuleNavItems } from "../../shared/config/modules";
import { siteConfig } from "../../shared/config/site.config";
import { getEvents } from "../event/event-api";
import EventCard from "../event/components/event-card";
import MapView from "./components/map-view";
import SectionHeader from "../../shared/ui/section-header";
import SidebarNav from "../shared/components/sidebar-nav";
import SpotlightCard from "./components/spotlight-card";
import { cityCards, sectionDescription, spotlightCards } from "./model/data";
import Image from "next/image";
import BackgroundImage from "../shared/components/background-image";
import { notFound } from "next/navigation";
import { checkModuleEnabled } from "../../api/site-navigation/routeGuard";

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
  const isEnabled = await checkModuleEnabled("start");
    if (!isEnabled) {
      notFound();
    }

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

  const navItems = await getEnabledModuleNavItems();

  return (
    <main className="min-h-screen bg-background">
      <div className="flex min-h-[calc(100vh-66px)] flex-col md:flex-row">
        <SidebarNav items={navItems} activeKey="start" />

        <section
          className="flex flex-1 flex-col gap-5.5 px-4 pb-8 pt-4"
          aria-label="Startsida"
        >
          <div className="relative flex flex-col justify-end overflow-hidden rounded-2xl px-4 pb-4 w-full h-50">
           <BackgroundImage />
            <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/20"></div>
            <h3 className="z-2 mt-3 text-3xl font-bold text-white">{siteConfig.areaName}</h3>
            <div className="z-2 gap-y-1 overflow-hidden text-sm text-gray-300 w-xs md:w-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </div>


          <div className="flex flex-col gap-2">
            <SectionHeader title="Just nu" as="h1" />
            <p className="m-0 text-sm leading-tight text-foreground-muted">{sectionDescription}</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
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
                className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
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
      </div >
    </main >
  );
}
