import Link from "next/link";
import { cn } from "../../../shared/utils/cn";

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
  return (
    <aside
      className="w-full min-w-0 shrink grow basis-auto border-b border-border bg-surface px-2.5 py-2 md:w-55 md:min-w-55 md:shrink-0 md:grow-0 md:basis-55 md:border-r md:border-b-0 md:p-2"
      aria-label={ariaLabel ?? "Vänstermeny"}
    >
      <nav className="flex flex-row gap-1.5 overflow-x-auto pb-1 md:flex-col md:gap-1 md:overflow-visible md:pb-0">
        {items.map((item) => {
          const isActive = item.key === activeKey;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex min-h-9.5 w-auto shrink-0 items-center justify-between whitespace-nowrap rounded-full border-none bg-surface px-4 py-2 text-sm leading-snug text-foreground no-underline hover:bg-brand-third md:w-full md:shrink md:whitespace-normal md:px-3 md:py-2.5",
                isActive && "bg-brand-secondary text-background hover:bg-brand-secondary",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="flex min-w-0 items-center gap-2">
                {item.iconSrc ? (
                  <img
                    src={item.iconSrc}
                    alt=""
                    className={cn(
                      "size-4.5 shrink-0 object-contain",
                      isActive && "brightness-0 invert",
                    )}
                    width={18}
                    height={18}
                    aria-hidden
                  />
                ) : null}
                <span className="text-left">{item.label}</span>
              </span>
              <img
                src="/icons/nav-arrow-right.svg"
                alt=""
                className={cn(
                  "size-3 shrink-0 object-contain",
                  isActive && "brightness-0 invert",
                )}
                width={12}
                height={12}
                aria-hidden
              />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
