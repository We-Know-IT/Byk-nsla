import type {
  DateScopeFilter,
  TimeSlotFilter,
} from "../model/filter-events";
import EventFilterDatum from "./toolbar/event-filter-datum";
import EventFilterEventtyp from "./toolbar/event-filter-eventtyp";
import EventFilterPlats from "./toolbar/event-filter-plats";
import EventFilterTid from "./toolbar/event-filter-tid";
import EventMonthNavigator from "./toolbar/event-month-navigator";
import EventSearchBar from "./toolbar/event-search-bar";

export type EventToolbarProps = {
  locationOptions: string[];
  categoryOptions: string[];
  searchDraft: string;
  onSearchDraftChange: (value: string) => void;
  onSearchSubmit: () => void;
  monthLabel: string;
  onMonthPrev: () => void;
  onMonthNext: () => void;
  selectedLocations: string[];
  onToggleLocation: (location: string) => void;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  timeSlot: TimeSlotFilter;
  onTimeSlotChange: (value: TimeSlotFilter) => void;
  dateScope: DateScopeFilter;
  onDateScopeChange: (value: DateScopeFilter) => void;
};

export default function EventToolbar({
  locationOptions,
  categoryOptions,
  searchDraft,
  onSearchDraftChange,
  onSearchSubmit,
  monthLabel,
  onMonthPrev,
  onMonthNext,
  selectedLocations,
  onToggleLocation,
  selectedCategories,
  onToggleCategory,
  timeSlot,
  onTimeSlotChange,
  dateScope,
  onDateScopeChange,
}: EventToolbarProps) {
  return (
    <div className="eventToolbar">
      <div className="eventToolbarTop">
        <EventSearchBar
          value={searchDraft}
          onChange={onSearchDraftChange}
          onSubmit={onSearchSubmit}
        />
        <EventMonthNavigator
          monthLabel={monthLabel}
          onPrev={onMonthPrev}
          onNext={onMonthNext}
        />
      </div>

      <div className="eventFilters">
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
        <EventFilterDatum value={dateScope} onChange={onDateScopeChange} />
      </div>
    </div>
  );
}
