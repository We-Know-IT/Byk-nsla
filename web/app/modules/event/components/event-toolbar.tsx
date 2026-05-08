type EventToolbarProps = {
  filters: string[];
  month: string;
};

export default function EventToolbar({ filters, month }: EventToolbarProps) {
  return (
    <div className="eventToolbar">
      <div className="eventToolbarTop">
        <div className="eventSearchBar">Sök</div>
        <button type="button" className="eventSearchButton">
          Sök
        </button>
        <div className="eventMonthControls">
          <button type="button" className="monthArrow" aria-label="Föregående månad">
            ←
          </button>
          <button type="button" className="monthLabel">
            {month} <span aria-hidden="true">⌄</span>
          </button>
          <button type="button" className="monthArrow" aria-label="Nästa månad">
            →
          </button>
        </div>
      </div>

      <div className="eventFilters">
        {filters.map((filter) => (
          <button key={filter} type="button" className="eventFilterChip">
            {filter} <span aria-hidden="true">⌄</span>
          </button>
        ))}
      </div>
    </div>
  );
}
