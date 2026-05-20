"use client";

type EventSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function EventSearchBar({ value, onChange, onSubmit }: EventSearchBarProps) {
  return (
    <>
      <label
        className="flex h-[34px] min-w-0 flex-1 cursor-text items-center rounded-full bg-neutral-300 px-4 text-lg text-[#161616]"
        htmlFor="event-toolbar-search"
      >
        <span className="sr-only">Sök evenemang</span>
        <input
          id="event-toolbar-search"
          className="min-w-0 flex-1 border-none bg-transparent font-inherit text-inherit outline-none placeholder:text-neutral-600"
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
      <button
        type="button"
        className="shrink-0 cursor-pointer rounded-full border-none bg-black px-3.5 py-2 text-[15px] leading-none text-white"
        onClick={onSubmit}
      >
        Sök
      </button>
    </>
  );
}
