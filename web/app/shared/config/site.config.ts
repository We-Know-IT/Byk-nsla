/**
 * Site branding and copy — edit this file when forking or deploying for a new municipality.
 * Keep asset files in `/web/public` and reference them with root-relative paths (e.g. `/brand/logo.svg`).
 */

/** Sidebar nav entry: `path` may omit the leading slash; `iconSrc` points to `public/` (e.g. `/icons/start.svg`). */
export type SiteNavItem = {
  readonly key: string;
  readonly label: string;
  readonly path: string;
  readonly enabled: boolean;
  readonly iconSrc?: string | null;
};

export const siteNavigation = [
  { key: "start", label: "Start", path: "/", enabled: true, iconSrc: null },
  { key: "event", label: "Event", path: "/event", enabled: true, iconSrc: null },
  { key: "utforska", label: "Utforska", path: "utforska", enabled: true, iconSrc: null },
  { key: "trafik", label: "Trafik", path: "/trafik", enabled: true, iconSrc: null },
  { key: "vader", label: "Väder", path: "vader", enabled: true, iconSrc: null },
] as const satisfies readonly SiteNavItem[];

export type ModuleKey = (typeof siteNavigation)[number]["key"];

/** Turns config paths into Next.js hrefs (`event` → `/event`, empty → `/`). */
export function normalizeNavPath(path: string): string {
  const trimmed = path.trim();
  if (trimmed === "" || trimmed === "/") {
    return "/";
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

export const siteConfig = {
  /** Shown in the top bar, document title, and other UI */
  name: "Bykänsla",

  htmlLang: "sv",

  metadata: {
    title: "Bykänsla",
    description: "Din by",
  },

  brand: {
    /**
     * Shown in the square mark when `markImageSrc` is not set.
     * Use one character for the default layout, or a short abbreviation.
     */
    markLetter: "B",
    /**
     * Optional image for the square mark (path under `public/`).
     * When set, this replaces the letter mark.
     */
    markImageSrc: null as string | null,
  },

  labels: {
    logout: "Logga ut",
    underConstruction: "Den här sidan är under konstruktion.",
  },

  /**
   * Local area name used in headings (e.g. "Vad händer i …").
   */
  areaName: "Min by",

  /**
   * Geography configuration for the local area.
   * Used to filter events and items to this specific area.
   */
  geography: {
    // Central Stockholm — adjust center/bounds when targeting a specific stadsdel
    center: [18.0686, 59.3293] as [number, number], // [longitude, latitude]
    maxDistanceKm: 2,
    bounds: {
      minLng: 18.02,
      maxLng: 18.12,
      minLat: 59.3,
      maxLat: 59.36,
    },
    keywords: ["minby", "östra byn", "vår by", "mina byn", "lilla byn"],
  },

  /** Left sidebar links — single source of truth for routes and optional icons. */
  navigation: siteNavigation,
} as const;

export type SiteConfig = typeof siteConfig;
