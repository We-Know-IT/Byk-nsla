import type { ReactNode } from "react";

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
    <label htmlFor={id} className="eventFilterCheckboxRow">
      <input
        id={id}
        type="checkbox"
        className="eventFilterCheckboxInput"
        checked={checked}
        onChange={() => onSelect()}
      />
      <span className="eventFilterCheckboxBox" aria-hidden="true" />
      <span className="eventFilterCheckboxLabel">{label}</span>
    </label>
  );
}
