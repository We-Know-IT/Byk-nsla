"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "../../../../shared/utils/cn";

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
  const title = `${label}${summarySuffix ?? ""}`;

  const triggerClass = cn(
    "flex min-h-7 cursor-pointer list-none items-center justify-between gap-2.5 rounded-full border border-[#c4c4c4] bg-[#ececec] px-3.5 text-sm font-medium leading-snug text-[#111] [list-style:none] [&::-webkit-details-marker]:hidden",
    size === "large" && "min-h-[34px] px-4 text-[15px]",
  );

  const headerClass = cn(
    "flex items-center justify-between gap-2.5 border-b border-black/10 px-3.5 py-2 text-sm text-[#111]",
    size === "large" && "px-4 py-2.5 text-[15px]",
  );

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
    <details ref={ref} className="group relative z-[1] open:z-[60]">
      <summary className={triggerClass}>
        <span className="min-w-0 flex-1 text-left font-medium">{title}</span>
        <ChevronDown className="shrink-0 text-[#111] transition-transform duration-150 ease-in-out group-open:rotate-180" />
      </summary>
      <div className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-[220px] max-w-[min(320px,92vw)] overflow-hidden rounded-xl border border-[#bdbdbd] bg-[#ececec] shadow-[0_10px_28px_rgb(0_0_0/0.14)]">
        <div className={headerClass} aria-hidden="true">
          <span className="min-w-0 flex-1 text-left font-medium">{title}</span>
          <ChevronDown className="shrink-0 text-[#111] transition-transform duration-150 ease-in-out group-open:rotate-180" />
        </div>
        <div className="px-0 pb-2 pt-1">{children}</div>
      </div>
    </details>
  );
}
