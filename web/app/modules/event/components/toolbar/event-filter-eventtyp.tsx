"use client";

import EventFilterCheckboxRow from "./event-filter-checkbox-row";
import EventFilterDropdown from "./event-filter-dropdown";

type EventFilterEventtypProps = {
  options: string[];
  selected: string[];
  onToggle: (category: string) => void;
};

export default function EventFilterEventtyp({
  options,
  selected,
  onToggle,
}: EventFilterEventtypProps) {
  const suffix = selected.length > 0 ? ` (${selected.length})` : undefined;

  return (
    <EventFilterDropdown label="Eventtyp" summarySuffix={suffix} size="large">
      <div className="eventFilterCheckboxList">
        {options.map((cat) => (
          <EventFilterCheckboxRow
            key={cat}
            id={`event-filter-typ-${cat}`}
            checked={selected.includes(cat)}
            onSelect={() => onToggle(cat)}
            label={cat}
          />
        ))}
      </div>
    </EventFilterDropdown>
  );
}
