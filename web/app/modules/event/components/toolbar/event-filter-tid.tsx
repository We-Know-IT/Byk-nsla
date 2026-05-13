"use client";

import EventFilterCheckboxRow from "./event-filter-checkbox-row";
import EventFilterDropdown from "./event-filter-dropdown";
import type { TimeSlotFilter } from "../../model/filter-events";

const TID_OPTIONS: { value: TimeSlotFilter; label: string }[] = [
  { value: "all", label: "Alla tider" },
  { value: "morning", label: "Förmiddag (ca 05–12)" },
  { value: "afternoon", label: "Eftermiddag (ca 12–17)" },
  { value: "evening", label: "Kväll (ca 17–24)" },
];

type EventFilterTidProps = {
  value: TimeSlotFilter;
  onChange: (slot: TimeSlotFilter) => void;
};

export default function EventFilterTid({ value, onChange }: EventFilterTidProps) {
  const active = TID_OPTIONS.find((o) => o.value === value);
  const suffix = value !== "all" && active ? ` · ${active.label.split(" ")[0]}` : undefined;

  return (
    <EventFilterDropdown label="Tid" summarySuffix={suffix} size="large">
      <div className="eventFilterCheckboxList">
        {TID_OPTIONS.map((opt) => (
          <EventFilterCheckboxRow
            key={opt.value}
            id={`event-filter-tid-${opt.value}`}
            checked={value === opt.value}
            onSelect={() => onChange(opt.value)}
            label={opt.label}
          />
        ))}
      </div>
    </EventFilterDropdown>
  );
}
