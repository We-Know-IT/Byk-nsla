"use client";
import Link from "next/link";
import { cn } from "../../../shared/utils/cn";
import React, { useState, useEffect, useRef } from "react";

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
  const [onMobile, setOnMobile] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;

    const saved = localStorage.getItem("sidebar-open");
    return saved ? JSON.parse(saved) : true;
  });

  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setOnMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock scroll when sidebar is open on mobile
  useEffect(() => {
    if (onMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, onMobile]);

  return (
    <>
      {onMobile && (
        <div className="h-14 w-full border-b border-border bg-surface md:hidden" />
      )}

      {/* Backdrop for mobile menu, handling close when clicked */}
      {onMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30"
          onClick={() => setIsOpen(false)}
        />
      )}



      <aside
        className={cn(
          // Mobile
          "fixed inset-y-0 left-0 z-40 h-screen w-64 border-r border-border bg-surface p-4 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",

          // Desktop
          "md:sticky md:top-0 md:h-screen md:translate-x-0 md:transition-all md:duration-200 md:overflow-x-hidden",
          isOpen
            ? "md:w-55 md:min-w-55 md:basis-55"
            : "md:w-18 md:min-w-18 md:basis-18"
        )}
        aria-label={ariaLabel ?? "Vänstermeny"}
        ref={sidebarRef}
      >
        <nav className="flex h-full flex-col gap-1.5 overflow-y-auto pb-0 md:gap-6">

          <div className="relative flex w-full flex-row items-center justify-between">
            <div
              className={cn(
                "flex min-h-9.5 w-full shrink-0 items-center whitespace-nowrap rounded-full border border-border bg-surface text-sm leading-snug text-foreground no-underline transition-all duration-200",

                isOpen ? "px-4 py-2 md:px-3" : "px-2 py-2 md:px-[6px]"
              )}
            >
              <img
                src="/icons/Frame.svg"
                alt=""
                className={cn(
                  "rounded-full bg-brand-secondary object-contain p-1 shrink-0"
                )}
                width={28}
                height={28}
                aria-hidden
              />
              <span className={cn(
                "text-center flex-1 transition-all duration-200 ease-in-out overflow-hidden",
                isOpen ? "max-w-40 opacity-100 mx-2" : "max-w-0 opacity-0 mx-0"
              )}>Förnamn</span>
              <img
                src="/icons/nav-arrow-right.svg"
                alt=""
                className={cn(
                  "size-3 shrink-0 object-contain transition-all duration-200 ease-in-out overflow-hidden",
                  isOpen ? "max-w-4 opacity-100" : "max-w-0 opacity-0"
                )}
                width={12}
                height={12}
                aria-hidden
              />
            </div>
          </div>

          {items.map((item) => {
            const isActive = item.key === activeKey;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "flex min-h-9.5 w-auto shrink-0 items-center whitespace-nowrap rounded-full border-none bg-surface px-4 py-2 text-sm leading-snug text-foreground no-underline hover:bg-brand-third md:w-full md:shrink md:py-2.5 transition-all duration-200",
                  isActive && "bg-brand-secondary text-background hover:bg-brand-secondary",
                  isOpen ? "md:px-3" : "md:px-[11px]"
                )}
                aria-current={isActive ? "page" : undefined}
              >

                {item.iconSrc ? (
                  <img
                    src={item.iconSrc}
                    alt=""
                    className={cn(
                      "size-4.5 object-contain shrink-0",
                      isActive && "brightness-0 invert"
                    )}
                    aria-hidden
                  />
                ) : null}
                <span className={cn(
                  "text-left transition-all duration-200 ease-in-out overflow-hidden",
                  isOpen ? "max-w-40 opacity-100 ml-2" : "max-w-0 opacity-0 ml-0"

                )}>{item.label}</span>

                <img
                  src="/icons/nav-arrow-right.svg"
                  alt=""
                  className={cn(
                    "size-3 shrink-0 object-contain transition-all duration-200 ease-in-out overflow-hidden",
                    isOpen ? "max-w-4 opacity-100 ml-auto" : "max-w-0 opacity-0 ml-0"
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
              "mt-auto flex min-h-9.5 w-auto shrink-0 items-center whitespace-nowrap rounded-full border-none bg-surface px-4 py-2 text-sm leading-snug text-foreground no-underline hover:bg-brand-third md:w-full md:shrink md:py-2.5 transition-all duration-200",
              isOpen ? "md:px-3" : "md:px-[11px]"
            )}
          >
            <img
              src={"/icons/question-mark.svg"}
              alt=""
              className="size-4.5 shrink-0 object-contain"
              width={18}
              height={18}
              aria-hidden
            />
            <span className={cn(
              "text-left transition-all duration-200 ease-in-out overflow-hidden",
              isOpen ? "max-w-40 opacity-100 ml-2" : "max-w-0 opacity-0 ml-0"
            )}>{"Hjälp"}</span>
            <img
              src="/icons/nav-arrow-right.svg"
              alt=""
              className={cn(
                "size-3 shrink-0 object-contain transition-all duration-200 ease-in-out overflow-hidden",
                isOpen ? "max-w-4 opacity-100 ml-auto" : "max-w-0 opacity-0 ml-0"
              )}
              width={12}
              height={12}
              aria-hidden
            />
          </Link>
        </nav>
      </aside>
      <button
        className={cn(
          "cursor-pointer rounded-r-xl bg-surface shadow-sm shadow-black/30 flex items-center justify-center z-39",
          "h-16 w-8",
          //Mobile
          "fixed top-20 left-0 transition-transform duration-300 ease-in-out",

          isOpen ? "translate-x-64 md:translate-none" : "translate-x-0",

          //Desktop
          "md:static md:top-auto"
        )}
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <img
          src={"/icons/nav-arrow-left.svg"}
          alt="MenuFold"
          className={'w-6 h-6 object-fill transition-transform hover:scale-110 ' + (!isOpen ? "rotate-180" : "")}
        />
      </button>
    </>
  );
}