import Link from "next/link";
import type { ModuleKey, ModuleNavItem } from "../../../shared/config/modules";

type SidebarNavProps = {
  items: ModuleNavItem[];
  activeKey: ModuleKey;
};

export default function SidebarNav({ items, activeKey }: SidebarNavProps) {
  return (
    <aside className="sidebar" aria-label="Vanstermeny">
      <nav className="menuList">
        {items.map((item) => {
          const isActive = item.key === activeKey;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`menuItem${isActive ? " isActive" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="menuItemLeading">
                {item.iconSrc ? (
                  <img
                    src={item.iconSrc}
                    alt=""
                    className="menuIcon"
                    width={18}
                    height={18}
                    aria-hidden
                  />
                ) : null}
                <span className="menuLabel">{item.label}</span>
              </span>
              <span className="menuArrow" aria-hidden="true">
                ›
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
