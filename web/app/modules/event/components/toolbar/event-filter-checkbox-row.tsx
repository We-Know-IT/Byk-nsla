import type { ReactNode } from "react";
import { cn } from "../../../../shared/utils/cn";

type EventFilterCheckboxRowProps = {
  id: string;
  checked: boolean;
  /** Called when the user activates the row (toggle for multi-select, select for single). */
  onSelect: () => void;
  label: ReactNode;
};

export default function EventFilterCheckboxRow({
  id,
  checked,
  onSelect,
  label,
}: EventFilterCheckboxRowProps) {
  return (
    <label
      htmlFor={id}
      className="relative mx-1 flex cursor-pointer items-start gap-2.5 rounded-lg px-2.5 py-2 text-sm leading-snug text-[#111] outline-none hover:bg-black/5 focus-within:outline focus-within:outline-2 focus-within:outline-[#1f3fa6] focus-within:outline-offset-2"
    >
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={() => onSelect()}
      />
      <span
        className={cn(
          "relative mt-0.5 box-border flex size-4 shrink-0 items-center justify-center rounded-sm border-[1.5px] border-[#111] bg-transparent",
          checked && "bg-[#111] text-white",
        )}
        aria-hidden="true"
      >
        {checked ? (
          <span className="text-[10px] font-bold leading-none" aria-hidden>
            ✓
          </span>
        ) : null}
      </span>
      <span className="flex min-w-0 flex-col items-start gap-0.5">{label}</span>
    </label>
  );
}
