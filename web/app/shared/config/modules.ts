import { normalizeNavPath, siteConfig, type ModuleKey } from "./site.config";

export type { ModuleKey };

export type ModuleNavItem = {
  key: ModuleKey;
  label: string;
  href: string;
  iconSrc?: string | null;
};

export function getEnabledModuleNavItems(): ModuleNavItem[] {
  return siteConfig.navigation
    .filter((module) => module.enabled)
    .map(({ key, label, path, iconSrc }) => ({
      key,
      label,
      href: normalizeNavPath(path),
      iconSrc: iconSrc ?? null,
    }));
}
