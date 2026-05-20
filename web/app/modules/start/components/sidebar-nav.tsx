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
      className="w-[220px] min-w-[220px] shrink-0 grow-0 basis-[220px] border-r border-border bg-surface p-2 max-[980px]:w-full max-[980px]:min-w-0 max-[980px]:shrink max-[980px]:grow max-[980px]:basis-auto max-[980px]:border-r-0 max-[980px]:border-b max-[980px]:border-border max-[980px]:px-2.5 max-[980px]:py-2"
      aria-label={ariaLabel ?? "Vänstermeny"}
    >
      <nav className="flex flex-col gap-1 max-[980px]:flex-row max-[980px]:overflow-x-auto">
        {items.map((item) => {
          const isActive = item.key === activeKey;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex min-h-[38px] w-full cursor-pointer items-center justify-between rounded-full border-none bg-surface px-3 py-2.5 text-sm leading-snug text-foreground no-underline hover:bg-brand-third",
                isActive && "bg-brand-secondary text-background hover:bg-brand-secondary",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="flex min-w-0 items-center gap-2">
                {item.iconSrc ? (
                  <img
                    src={item.iconSrc}
                    alt=""
                    className="size-[18px] shrink-0 object-contain"
                    width={18}
                    height={18}
                    aria-hidden
                  />
                ) : null}
                <span className="text-left">{item.label}</span>
              </span>
              <span className="text-sm leading-none" aria-hidden="true">
                ›
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
