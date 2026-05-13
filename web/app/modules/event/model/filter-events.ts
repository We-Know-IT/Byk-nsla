import type { EventGridCardData } from "./data";

export type TimeSlotFilter = "all" | "morning" | "afternoon" | "evening";

export type EventFilterCriteria = {
  search: string;
  /** Empty = all locations */
  locations: string[];
  /** Empty = all categories */
  categories: string[];
  timeSlot: TimeSlotFilter;
};

const OTHER_CATEGORY = "Övrigt";

function normalizeSearch(value: string): string {
  return value.trim().toLocaleLowerCase("sv-SE");
}

function hasClockTime(dateIso: string): boolean {
  if (!dateIso.includes("T")) return false;
  const m = dateIso.match(/T(\d{2}):(\d{2})/);
  if (!m) return false;
  return !(m[1] === "00" && m[2] === "00");
}

function parseEventDate(dateIso: string | undefined): Date | null {
  if (!dateIso) return null;
  const d = new Date(dateIso);
  return Number.isNaN(d.getTime()) ? null : d;
}

function timeSlotForDate(d: Date): "morning" | "afternoon" | "evening" {
  const h = d.getHours();
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  return "evening";
}

function cardCategory(card: EventGridCardData): string {
  const c = card.category?.trim();
  return c ? c : OTHER_CATEGORY;
}

function matchesSearch(card: EventGridCardData, q: string): boolean {
  if (!q) return true;
  const n = normalizeSearch(q);
  return (
    normalizeSearch(card.title).includes(n) ||
    normalizeSearch(card.text).includes(n) ||
    normalizeSearch(card.location).includes(n)
  );
}

function matchesTimeSlot(card: EventGridCardData, slot: TimeSlotFilter): boolean {
  if (slot === "all") return true;
  if (!card.dateIso || !hasClockTime(card.dateIso)) return false;
  const d = parseEventDate(card.dateIso);
  if (!d) return false;
  return timeSlotForDate(d) === slot;
}

/**
 * Filters event cards. Options for Plats/Eventtyp should be derived from the full unfiltered list.
 * `locations` / `categories`: empty arrays mean no filter (all); otherwise card must match one of the selected values.
 */
export function filterEventCards(
  cards: EventGridCardData[],
  criteria: EventFilterCriteria,
): EventGridCardData[] {
  return cards.filter((card) => {
    if (!matchesSearch(card, criteria.search)) return false;

    if (criteria.locations.length > 0 && !criteria.locations.includes(card.location)) {
      return false;
    }

    const cat = cardCategory(card);
    if (criteria.categories.length > 0 && !criteria.categories.includes(cat)) {
      return false;
    }

    if (!matchesTimeSlot(card, criteria.timeSlot)) return false;

    return true;
  });
}

export function uniqueLocations(cards: EventGridCardData[]): string[] {
  const set = new Set<string>();
  for (const c of cards) set.add(c.location);
  return [...set].sort((a, b) => a.localeCompare(b, "sv"));
}

export function uniqueCategories(cards: EventGridCardData[]): string[] {
  const set = new Set<string>();
  for (const c of cards) set.add(cardCategory(c));
  return [...set].sort((a, b) => a.localeCompare(b, "sv"));
}
