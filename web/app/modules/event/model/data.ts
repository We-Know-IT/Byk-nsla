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
};

export const eventFilters = ["Plats", "Eventtyp", "Tid", "Datum"];

export const eventMonth = "Mars";

const allEventGridCards: EventGridCardData[] = [
  {
    id: "event-card-1",
    title: "Trygghetsvandring",
    date: "12 december",
    text: "In nulla in fames ut velit ridiculus...",
    cta: "Knapp",
    location: "Linero",
  },
  {
    id: "event-card-2",
    title: "Julmarknad",
    date: "13 december",
    text: "In nulla in fames ut velit ridiculus...",
    cta: "Knapp",
    location: "Centrum",
  },
  {
    id: "event-card-3",
    title: "Skolidrott",
    date: "14 december",
    text: "In nulla in fames ut velit ridiculus...",
    cta: "Knapp",
    location: "Linero",
  },
  {
    id: "event-card-4",
    title: "Seniorfika",
    date: "15 december",
    text: "In nulla in fames ut velit ridiculus...",
    cta: "Knapp",
    location: "Klostergården",
  },
  {
    id: "event-card-5",
    title: "Barnteater",
    date: "16 december",
    text: "In nulla in fames ut velit ridiculus...",
    cta: "Knapp",
    location: "Linero",
  },
];

const normalize = (value: string) => value.trim().toLocaleLowerCase("sv-SE");
const selectedArea = normalize(siteConfig.areaName);

export const eventGridCards: EventGridCardData[] = allEventGridCards.filter(
  (card) => normalize(card.location) === selectedArea,
);
