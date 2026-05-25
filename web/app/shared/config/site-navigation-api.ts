import { siteNavigation } from "./site.config";

export const getSiteNavigationPageMap = (overrides: Record<string, boolean> = {}) =>
  Object.fromEntries(
    siteNavigation.map(({ key, enabled }) => [key, overrides[key] ?? enabled]),
  ) as Record<string, boolean>;

export const getSiteNavigationApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
  }

  return "/api";
};
