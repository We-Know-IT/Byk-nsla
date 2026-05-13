"use client";

import EventFilterCheckboxRow from "./event-filter-checkbox-row";
import EventFilterDropdown from "./event-filter-dropdown";

type EventFilterPlatsProps = {
  options: string[];
  selected: string[];
  onToggle: (location: string) => void;
};

export default function EventFilterPlats({ options, selected, onToggle }: EventFilterPlatsProps) {
  const suffix = selected.length > 0 ? ` (${selected.length})` : undefined;

  return (
    <EventFilterDropdown label="Plats" summarySuffix={suffix} size="large">
      <div className="eventFilterCheckboxList">
        {options.map((loc) => (
          <EventFilterCheckboxRow
            key={loc}
            id={`event-filter-plats-${loc}`}
            checked={selected.includes(loc)}
            onSelect={() => onToggle(loc)}
            label={loc}
          />
        ))}
      </div>
    </EventFilterDropdown>
  );
}
