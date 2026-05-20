import type { TimeSlotFilter } from "../model/filter-events";
import EventFilterEventtyp from "./toolbar/event-filter-eventtyp";
import EventFilterPlats from "./toolbar/event-filter-plats";
import EventFilterTid from "./toolbar/event-filter-tid";
import EventSearchBar from "./toolbar/event-search-bar";

export type EventToolbarProps = {
  locationOptions: string[];
  categoryOptions: string[];
  searchDraft: string;
  onSearchDraftChange: (value: string) => void;
  onSearchSubmit: () => void;
  selectedLocations: string[];
  onToggleLocation: (location: string) => void;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  timeSlot: TimeSlotFilter;
  onTimeSlotChange: (value: TimeSlotFilter) => void;
};

export default function EventToolbar({
  locationOptions,
  categoryOptions,
  searchDraft,
  onSearchDraftChange,
  onSearchSubmit,
  selectedLocations,
  onToggleLocation,
  selectedCategories,
  onToggleCategory,
  timeSlot,
  onTimeSlotChange,
}: EventToolbarProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 max-[980px]:flex-wrap">
        <EventSearchBar
          value={searchDraft}
          onChange={onSearchDraftChange}
          onSubmit={onSearchSubmit}
        />
      </div>

      <div className="relative z-[1] flex flex-wrap items-center gap-2">
        <EventFilterPlats
          options={locationOptions}
          selected={selectedLocations}
          onToggle={onToggleLocation}
        />
        <EventFilterEventtyp
          options={categoryOptions}
          selected={selectedCategories}
          onToggle={onToggleCategory}
        />
        <EventFilterTid value={timeSlot} onChange={onTimeSlotChange} />
      </div>
    </div>
  );
}
