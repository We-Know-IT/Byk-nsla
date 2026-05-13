import { siteConfig } from "../../../shared/config/site.config";

export const eventModuleName = "event";

export type EventGridCardData = {
  id: string;
  title: string;
  date: string;
  text: string;
  cta: string;
  location: string;
  imageUrl?: string;
  eventUrl?: string;
  /** ISO 8601 from API or mocks — used for month, datum, and tid filters */
  dateIso?: string;
  /** Event type label for Eventtyp filter */
  category?: string;
};

const allEventGridCards: EventGridCardData[] = [
  {
    id: "event-card-1",
    title: "Trygghetsvandring",
    date: "12 mars 2026 10:00",
    text: "In nulla in fames ut velit ridiculus...",
    cta: "Knapp",
    location: "Linero",
    dateIso: "2026-03-12T10:00:00",
    category: "Trygghet",
  },
  {
    id: "event-card-2",
    title: "Julmarknad",
    date: "13 mars 2026 14:30",
    text: "In nulla in fames ut velit ridiculus...",
    cta: "Knapp",
    location: "Centrum",
    dateIso: "2026-03-13T14:30:00",
    category: "Kultur",
  },
  {
    id: "event-card-3",
    title: "Skolidrott",
    date: "14 mars 2026",
    text: "In nulla in fames ut velit ridiculus...",
    cta: "Knapp",
    location: "Linero",
    dateIso: "2026-03-14",
    category: "Sport",
  },
  {
    id: "event-card-4",
    title: "Seniorfika",
    date: "5 maj 2026 15:00",
    text: "In nulla in fames ut velit ridiculus...",
    cta: "Knapp",
    location: "Klostergården",
    dateIso: "2026-05-05T15:00:00",
    category: "Socialt",
  },
  {
    id: "event-card-5",
    title: "Barnteater",
    date: "16 mars 2026 18:30",
    text: "In nulla in fames ut velit ridiculus...",
    cta: "Knapp",
    location: "Linero",
    dateIso: "2026-03-16T18:30:00",
    category: "Kultur",
  },
];

const normalize = (value: string) => value.trim().toLocaleLowerCase("sv-SE");
const selectedArea = normalize(siteConfig.areaName);

/** Prefer cards in `areaName`; if none match, show all mock cards so the grid is not empty in demo. */
export const eventGridCards: EventGridCardData[] = (() => {
  const matched = allEventGridCards.filter(
    (card) => normalize(card.location) === selectedArea,
  );
  return matched.length > 0 ? matched : allEventGridCards;
})();
