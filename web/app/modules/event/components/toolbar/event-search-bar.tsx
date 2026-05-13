"use client";

type EventSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function EventSearchBar({ value, onChange, onSubmit }: EventSearchBarProps) {
  return (
    <>
      <label className="eventSearchBar" htmlFor="event-toolbar-search">
        <span className="sr-only">Sök evenemang</span>
        <input
          id="event-toolbar-search"
          className="eventSearchBarInput"
          type="search"
          placeholder="Sök…"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit();
            }
          }}
        />
      </label>
      <button type="button" className="eventSearchButton" onClick={onSubmit}>
        Sök
      </button>
    </>
  );
}
