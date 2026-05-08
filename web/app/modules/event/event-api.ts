import { siteConfig } from "../../shared/config/site.config";
import type { EventGridCardData } from "./model/data";

export type EventListItem = {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  url?: string;
  locationLabel?: string;
};

type EventsApiSuccess = {
  success: true;
  data: EventListItem[];
};

type EventsApiError = {
  success: false;
  error: {
    message: string;
  };
};

type EventsApiResponse = EventsApiSuccess | EventsApiError;

const getAppBaseUrl = () => process.env.APP_URL ?? "http://localhost:3000";

const formatEventDateLabel = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const hasTime =
    value.includes("T") && /\d{2}:\d{2}/.test(value);

  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(hasTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(parsed);
};

export function mapEventListToGridCards(items: EventListItem[]): EventGridCardData[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    date: formatEventDateLabel(item.date),
    text: item.description,
    cta: item.url ? "Mer info" : "Knapp",
    location: item.locationLabel ?? siteConfig.areaName,
    imageUrl: item.imageUrl,
    eventUrl: item.url,
  }));
}

export async function getEvents(): Promise<{
  events: EventListItem[];
  error: string | null;
}> {
  try {
    const response = await fetch(new URL("/api/events", getAppBaseUrl()).toString(), {
      cache: "no-store",
    });

    const payload: EventsApiResponse = await response.json();

    if (!response.ok || !payload.success) {
      return {
        events: [],
        error: payload.success
          ? "Kunde inte hämta evenemang."
          : payload.error.message,
      };
    }

    return { events: payload.data, error: null };
  } catch {
    return {
      events: [],
      error: "Kunde inte ansluta till evenemangstjänsten just nu.",
    };
  }
}
