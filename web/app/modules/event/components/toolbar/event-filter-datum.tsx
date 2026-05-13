"use client";

import EventFilterCheckboxRow from "./event-filter-checkbox-row";
import EventFilterDropdown from "./event-filter-dropdown";
import type { DateScopeFilter } from "../../model/filter-events";

const DATUM_OPTIONS: { value: DateScopeFilter; label: string; hint: string }[] = [
  { value: "all", label: "Alla datum", hint: "Ignorera vald månad" },
  { value: "month", label: "Vald månad", hint: "Matcha månadsnavigeringen" },
];

type EventFilterDatumProps = {
  value: DateScopeFilter;
  onChange: (scope: DateScopeFilter) => void;
};

export default function EventFilterDatum({ value, onChange }: EventFilterDatumProps) {
  const suffix = value === "month" ? " · Månad" : undefined;

  return (
    <EventFilterDropdown label="Datum" summarySuffix={suffix} size="large">
      <div className="eventFilterCheckboxList">
        {DATUM_OPTIONS.map((opt) => (
          <EventFilterCheckboxRow
            key={opt.value}
            id={`event-filter-datum-${opt.value}`}
            checked={value === opt.value}
            onSelect={() => onChange(opt.value)}
            label={
              <>
                <span className="eventFilterCheckboxLabelTitle">{opt.label}</span>
                <span className="eventFilterCheckboxLabelHint">{opt.hint}</span>
              </>
            }
          />
        ))}
      </div>
    </EventFilterDropdown>
  );
}
