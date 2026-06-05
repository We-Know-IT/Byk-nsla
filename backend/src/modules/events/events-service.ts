import type { EventsAdapter, ExternalEvent } from "../../adapters/contracts/events-adapter.js";

const DEFAULT_AREA_NAME = "Linero";

const normalizeArea = (value: string): string => value.trim().toLocaleLowerCase("sv-SE");

const filterEventsForArea = (
  events: ExternalEvent[],
  areaName: string = DEFAULT_AREA_NAME,
): ExternalEvent[] => {
  const target = normalizeArea(areaName);
  const matched = events.filter(
    (event) => normalizeArea(event.locationLabel ?? "") === target,
  );
  return matched.length > 0 ? matched : events;
};

export class EventsService {
  constructor(private readonly adapter: EventsAdapter) {}

  async listEvents() {
    const events = await this.adapter.getEvents();
    const filtered = filterEventsForArea(events);

    return filtered.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      description: event.description,
      imageUrl: event.imageUrl,
      url: event.url,
      locationLabel: event.locationLabel,
      category: event.category,
    }));
  }
}
