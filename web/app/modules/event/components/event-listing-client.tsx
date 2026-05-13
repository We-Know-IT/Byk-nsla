"use client";

import { useMemo, useState } from "react";
import type { EventGridCardData } from "../model/data";
import {
  type DateScopeFilter,
  type TimeSlotFilter,
  type ViewMonth,
  filterEventCards,
  inferInitialViewMonth,
  uniqueCategories,
  uniqueLocations,
} from "../model/filter-events";
import EventGridCard from "./event-grid-card";
import EventToolbar from "./event-toolbar";

function formatViewMonthLabel(viewMonth: ViewMonth): string {
  const d = new Date(viewMonth.year, viewMonth.monthIndex, 1);
  const raw = new Intl.DateTimeFormat("sv-SE", {
    month: "long",
    year: "numeric",
  }).format(d);
  return raw.charAt(0).toLocaleUpperCase("sv-SE") + raw.slice(1);
}

function shiftViewMonth(viewMonth: ViewMonth, delta: number): ViewMonth {
  const d = new Date(viewMonth.year, viewMonth.monthIndex + delta, 1);
  return { year: d.getFullYear(), monthIndex: d.getMonth() };
}

type EventListingClientProps = {
  cards: EventGridCardData[];
};

export default function EventListingClient({ cards }: EventListingClientProps) {
  const [searchDraft, setSearchDraft] = useState("");
  const [searchApplied, setSearchApplied] = useState("");
  const [viewMonth, setViewMonth] = useState<ViewMonth>(() => inferInitialViewMonth(cards));
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [timeSlot, setTimeSlot] = useState<TimeSlotFilter>("all");
  const [dateScope, setDateScope] = useState<DateScopeFilter>("month");

  const locationOptions = useMemo(() => uniqueLocations(cards), [cards]);
  const categoryOptions = useMemo(() => uniqueCategories(cards), [cards]);

  const criteria = useMemo(
    () => ({
      search: searchApplied,
      locations: selectedLocations,
      categories: selectedCategories,
      timeSlot,
      dateScope,
      viewMonth,
    }),
    [searchApplied, selectedLocations, selectedCategories, timeSlot, dateScope, viewMonth],
  );

  const filteredCards = useMemo(() => filterEventCards(cards, criteria), [cards, criteria]);

  const monthLabel = useMemo(() => formatViewMonthLabel(viewMonth), [viewMonth]);

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((x) => x !== loc) : [...prev, loc],
    );
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((x) => x !== cat) : [...prev, cat],
    );
  };

  return (
    <>
      <EventToolbar
        locationOptions={locationOptions}
        categoryOptions={categoryOptions}
        searchDraft={searchDraft}
        onSearchDraftChange={setSearchDraft}
        onSearchSubmit={() => setSearchApplied(searchDraft.trim())}
        monthLabel={monthLabel}
        onMonthPrev={() => setViewMonth((m) => shiftViewMonth(m, -1))}
        onMonthNext={() => setViewMonth((m) => shiftViewMonth(m, 1))}
        selectedLocations={selectedLocations}
        onToggleLocation={toggleLocation}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        timeSlot={timeSlot}
        onTimeSlotChange={setTimeSlot}
        dateScope={dateScope}
        onDateScopeChange={setDateScope}
      />

      <div className="eventGrid">
        {filteredCards.length === 0 ? (
          <p className="eventGridEmpty">Inga evenemang matchar dina val.</p>
        ) : (
          filteredCards.map((card) => <EventGridCard key={card.id} card={card} />)
        )}
      </div>
    </>
  );
}
