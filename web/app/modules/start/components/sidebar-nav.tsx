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
      className="w-full min-w-0 shrink grow basis-auto border-b border-border bg-surface px-2.5 py-2 md:sticky md:top-0 md:h-[calc(100vh)] md:w-55 md:min-w-55 md:shrink-0 md:grow-0 md:basis-55 md:border-r md:border-b-0 md:p-4"
      aria-label={ariaLabel ?? "Vänstermeny"}
    >
      <nav className="flex flex-row gap-1.5 overflow-x-auto pb-1 md:flex-col md:h-full md:gap-6 md:overflow-visible md:pb-0">

        <div className="grid min-h-9.5 w-auto shrink-0 grid-cols-[1fr_auto_1fr] items-center whitespace-nowrap rounded-full border border-border bg-surface text-sm leading-snug text-foreground no-underline md:w-full md:shrink md:whitespace-normal">
        <span className="flex min-w-0 items-center gap-2 justify-self-start">
          <img
            src="/icons/Frame.svg"
            alt=""
            className={cn(
              "object-contain rounded-full bg-brand-secondary p-1 m-0.5",
            )}
            aria-hidden
          />
        </span>
        <span className="text-center my-2 justify-self-center">Förnamn</span>
        <img
          src="/icons/nav-arrow-right.svg"
          alt=""
          className={cn(
            "size-3 shrink-0 object-contain mr-2.5 justify-self-end",
          )} width={12}
          height={12}
          aria-hidden
        />
        </div>

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
        <Link
              href={"/"}
              className={cn(
                "flex min-h-9.5 w-auto shrink-0 items-center justify-between whitespace-nowrap rounded-full border-none bg-surface px-4 py-2 text-sm leading-snug text-foreground no-underline hover:bg-brand-third md:mt-auto md:w-full md:shrink md:whitespace-normal md:px-3 md:py-2.5",
              )}
            >
               <span className="flex min-w-0 items-center gap-2">
                  <img
                    src={"/icons/question-mark.svg"}
                    alt=""
                    className={cn(
                      "size-4.5 shrink-0 object-contain"
                    )}
                    width={18}
                    height={18}
                    aria-hidden
                  />
                <span className="text-left">{"Hjälp"}</span>
              </span>
              <img
                src="/icons/nav-arrow-right.svg"
                alt=""
                className={cn(
                  "size-3 shrink-0 object-contain",
  
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
