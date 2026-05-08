import type { EventsAdapter, ExternalEvent } from "../contracts/events-adapter.js";
import { env } from "../../config/env.js";

const DISCOVERY_BASE = "https://app.ticketmaster.com/discovery/v2";

type TicketmasterImage = { url?: string; width?: number; height?: number };
type TicketmasterVenue = {
  name?: string;
  city?: { name?: string };
};
type TicketmasterEvent = {
  id?: string;
  name?: string;
  url?: string;
  info?: string;
  images?: TicketmasterImage[];
  dates?: { start?: { localDate?: string; localTime?: string } };
  _embedded?: { venues?: TicketmasterVenue[] };
};

type TicketmasterEventsResponse = {
  _embedded?: { events?: TicketmasterEvent[] };
};

function buildDiscoveryUrl(): string {
  const params = new URLSearchParams();
  params.set("apikey", env.ticketmasterApiKey);
  params.set("city", env.ticketmasterCity);
  params.set("countryCode", env.ticketmasterCountryCode);
  params.set("size", String(env.ticketmasterPageSize));
  params.set("sort", env.ticketmasterSort);
  if (env.ticketmasterKeyword) {
    params.set("keyword", env.ticketmasterKeyword);
  }
  return `${DISCOVERY_BASE}/events.json?${params.toString()}`;
}

function pickImageUrl(images: TicketmasterImage[] | undefined): string | undefined {
  if (!images?.length) {
    return undefined;
  }
  const withUrl = images.filter((i) => i.url);
  if (!withUrl.length) {
    return undefined;
  }
  const sorted = [...withUrl].sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
  return sorted[0]?.url;
}

function venueLabel(embedded: TicketmasterEvent["_embedded"]): string | undefined {
  const v = embedded?.venues?.[0];
  if (v?.name) {
    return v.city?.name ? `${v.name}, ${v.city.name}` : v.name;
  }
  return v?.city?.name;
}

function normalizeDateTime(localDate: string, localTime?: string): string {
  if (!localTime) {
    return localDate;
  }

  const trimmed = localTime.trim();
  if (!trimmed) {
    return localDate;
  }

  // Ticketmaster can return either HH:mm or HH:mm:ss.
  if (/^\d{2}:\d{2}$/.test(trimmed) || /^\d{2}:\d{2}:\d{2}$/.test(trimmed)) {
    return `${localDate}T${trimmed}`;
  }

  return localDate;
}

function mapEvent(raw: TicketmasterEvent): ExternalEvent | null {
  const id = raw.id;
  const title = raw.name;
  const localDate = raw.dates?.start?.localDate;
  if (!id || !title || !localDate) {
    return null;
  }

  const localTime = raw.dates?.start?.localTime;
  const date = normalizeDateTime(localDate, localTime);
  const description = raw.info?.trim() || "Läs mer om evenemanget via Ticketmaster.";

  return {
    id,
    title,
    date,
    description,
    imageUrl: pickImageUrl(raw.images),
    url: raw.url,
    locationLabel: venueLabel(raw._embedded) ?? env.ticketmasterCity,
  };
}

export class TicketmasterEventsAdapter implements EventsAdapter {
  async getEvents(): Promise<ExternalEvent[]> {
    if (!env.ticketmasterApiKey) {
      throw new Error(
        "TICKETMASTER_API_KEY (eller TICKETMASTER_CONSUMER_KEY) saknas för events-provider ticketmaster.",
      );
    }

    const url = buildDiscoveryUrl();
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Ticketmaster svarade med ${response.status}: ${text.slice(0, 200)}`,
      );
    }

    const data = (await response.json()) as TicketmasterEventsResponse;
    const rawEvents = data._embedded?.events ?? [];

    return rawEvents.map(mapEvent).filter((e): e is ExternalEvent => e !== null);
  }
}
