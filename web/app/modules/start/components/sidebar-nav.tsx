"use client";
import Link from "next/link";
import { cn } from "../../../shared/utils/cn";
import React, { useState } from "react";


export type SidebarNavItem = {
  key: string;
  label: string;
  href: string;
  iconSrc?: string | null;
};

type SidebarNavProps = {
  items: readonly SidebarNavItem[];
  activeKey: string;
  ariaLabel?: string;
};

export default function SidebarNav({ items, activeKey, ariaLabel }: SidebarNavProps) {
  const [isOpen, setIsOpen] = useState(true);

  function screenSize() {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }
  onload = screenSize;
  


  return (
    <aside
      className={cn("w-full min-w-0 shrink grow basis-auto border-b border-border bg-surface px-2.5 py-2 md:sticky md:top-0 md:h-[calc(100vh)] md:w-55 md:min-w-55 md:shrink-0 md:grow-0 md:basis-55 md:border-r md:border-b-0 md:p-4", !isOpen && "w-18 md:w-18 md:min-w-18 md:basis-18")}
      aria-label={ariaLabel ?? "Vänstermeny"}
    >
      <nav className="flex flex-row gap-1.5 overflow-x-auto pb-1 md:flex-col md:h-full md:gap-6 md:overflow-visible md:pb-0">
        <div className="relative flex flex-row w-full items-center justify-between">
          <div className={cn(
            "grid min-h-9.5 w-auto shrink-0 grid-cols-[1fr_auto_1fr] items-center whitespace-nowrap rounded-full border border-border bg-surface text-sm leading-snug text-foreground no-underline md:w-full md:shrink md:whitespace-normal",
            !isOpen && "w-9.5 grid-cols-1 justify-items-center md:w-9.5",
            )}>

            <span className={cn("flex min-w-0 items-center gap-2 justify-self-start", !isOpen && "justify-self-center gap-0")}>
              <img
                src="/icons/Frame.svg"
                alt=""
                className={cn(
                  "rounded-full bg-brand-secondary object-contain p-1 m-0.5",
                  !isOpen && "m-0",
                )}
                aria-hidden
              />
            </span>
            <span className={cn("my-2 justify-self-center text-center", !isOpen && "hidden")}>Förnamn</span>
            <img
              src="/icons/nav-arrow-right.svg"
              alt=""
              className={cn(
                "mr-2.5 size-3 shrink-0 justify-self-end object-contain",
                !isOpen && "hidden",
              )} width={12}
              height={12}
              aria-hidden
            />
          </div>

        </div>
        <button
          className={cn(
            "absolute right-0 translate-x-4 translate-y-1 z-20",
            "cursor-pointer rounded-md bg-surface shadow-sm transition-transform duration-200",
            "flex items-center justify-center shrink-0 shadow-none"
          )}

          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <img
            src={isOpen ? "/icons/arrow-left-tag.svg" : "/icons/arrow-right-tag.svg"}
            alt="MenuFold"
            className="size-7 object-fill transition-transform hover:scale-110"
          />
        </button>

        {items.map((item) => {
          const isActive = item.key === activeKey;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex min-h-9.5 w-auto shrink-0 items-center justify-between whitespace-nowrap rounded-full border-none bg-surface px-4 py-2 text-sm leading-snug text-foreground no-underline hover:bg-brand-third md:w-full md:shrink md:whitespace-normal md:px-3 md:py-2.5",
                isActive && "bg-brand-secondary text-background hover:bg-brand-secondary",
                !isOpen && "justify-center md:px-2"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="flex min-w-0 items-center gap-2">
                {item.iconSrc ? (
                  <img
                    src={item.iconSrc}
                    alt=""
                    className={cn(
                      "object-contain size-4.5 shrink-0",
                      isActive && "brightness-0 invert",
                    )}
                    aria-hidden
                  />
                ) : null}
                <span className={cn("text-left", !isOpen && "hidden")}>{item.label}</span>
              </span>
              <img
                src="/icons/nav-arrow-right.svg"
                alt=""
                className={cn(
                  "size-3 shrink-0 object-contain",
                  isActive && "brightness-0 invert",
                  !isOpen && "hidden"
                )}
                width={12}
                height={12}
                aria-hidden
              />
            </Link>
          );
        })}
        <Link
          href={"/"}
          className={cn(
            "flex min-h-9.5 w-auto shrink-0 items-center justify-between whitespace-nowrap rounded-full border-none bg-surface px-4 py-2 text-sm leading-snug text-foreground no-underline hover:bg-brand-third md:mt-auto md:w-full md:shrink md:whitespace-normal md:px-3 md:py-2.5",
            !isOpen && "justify-center md:px-2"
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            <img
              src={"/icons/question-mark.svg"}
              alt=""
              className={cn(
                "object-contain size-4.5 shrink-0",
              )}
              width={18}
              height={18}
              aria-hidden
            />
            <span className={cn("text-left", !isOpen && "hidden")}>{"Hjälp"}</span>
          </span>
          <img
            src="/icons/nav-arrow-right.svg"
            alt=""
            className={cn(
              "size-3 shrink-0 object-contain",
              !isOpen && "hidden"
            )}
            width={12}
            height={12}
            aria-hidden
          />
        </Link>
      </nav>
    </aside>
  );
}
