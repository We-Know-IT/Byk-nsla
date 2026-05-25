import { normalizeNavPath, siteNavigation, type ModuleKey } from "./site.config";
import { getSiteNavigationApiBaseUrl } from "./site-navigation-api";

export type { ModuleKey };

export type ModuleNavItem = {
  key: ModuleKey;
  label: string;
  href: string;
  iconSrc?: string | null;
};

export async function getEnabledModuleNavItems(): Promise<ModuleNavItem[]> {
  const apiUrl = getSiteNavigationApiBaseUrl();
  let activePages: Record<string, boolean> = {};
  
  try {
    const res = await fetch(`${apiUrl}/site-navigation`, { cache: 'no-store' });
    if (res.ok) {
       const data = await res.json();
       if (data.success && data.data && data.data.pages) {
         activePages = data.data.pages;
       }
    }
  } catch (error) {
    console.error("Failed to load navigation configuration", error);
  }

  return siteNavigation
    .filter((module) => {
      return activePages[module.key] ?? module.enabled;
    })
    .map(({ key, label, path, iconSrc }) => ({
      key,
      label,
      href: normalizeNavPath(path),
      iconSrc: iconSrc ?? null,
    }));
}
