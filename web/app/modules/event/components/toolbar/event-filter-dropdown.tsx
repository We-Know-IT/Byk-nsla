"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 4.25L6 7.75L9.5 4.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type EventFilterDropdownSize = "default" | "large";

type EventFilterDropdownProps = {
  label: string;
  /** Shown after label when filters are active, e.g. "(2)" */
  summarySuffix?: string;
  children: ReactNode;
  size?: EventFilterDropdownSize;
};

export default function EventFilterDropdown({
  label,
  summarySuffix,
  children,
  size = "default",
}: EventFilterDropdownProps) {
  const ref = useRef<HTMLDetailsElement>(null);
  const sizeClass = size === "large" ? " eventFilterDropdown--large" : "";
  const title = `${label}${summarySuffix ?? ""}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!el.open) return;
      const target = e.target;
      if (target instanceof Node && el.contains(target)) return;
      el.open = false;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !el.open) return;
      el.open = false;
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <details ref={ref} className={`eventFilterDropdown${sizeClass}`}>
      <summary className="eventFilterDropdownTrigger">
        <span className="eventFilterDropdownTriggerText">{title}</span>
        <ChevronDown className="eventFilterDropdownChevron" />
      </summary>
      <div className="eventFilterDropdownPanel">
        <div className="eventFilterDropdownPanelHeader" aria-hidden="true">
          <span className="eventFilterDropdownTriggerText">{title}</span>
          <ChevronDown className="eventFilterDropdownChevron" />
        </div>
        <div className="eventFilterDropdownPanelBody">{children}</div>
      </div>
    </details>
  );
}
