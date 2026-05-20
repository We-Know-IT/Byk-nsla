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
  { key: "start", label: "Start", path: "/", enabled: true, iconSrc: "/icons/home.svg" },
  { key: "event", label: "Event", path: "/event", enabled: true, iconSrc: "/icons/calendar.svg" },
  { key: "utforska", label: "Utforska", path: "utforska", enabled: true, iconSrc: "/icons/map.svg" },
  { key: "trafik", label: "Trafik", path: "/trafik", enabled: true, iconSrc: "/icons/train.svg" },
  { key: "vader", label: "Väder", path: "vader", enabled: true, iconSrc: "/icons/sun-light.svg" },
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

/** Semantic palette; maps to CSS custom properties injected on `<html>`. */
export type SiteTheme = {
  background: string;
  surface: string;
  surfaceHover: string;
  border: string;
  foreground: string;
  foregroundMuted: string;
  brandPrimary: string;
  brandForeground: string;
};

const siteTheme = {
  background: "#eff4ff",
  surface: "#f8faff",
  surfaceHover: "#e8efff",
  border: "#d4e0ff",
  foreground: "#1c2e65",
  foregroundMuted: "#4e5f8b",
  brandPrimary: "#1f3fa6",
  brandForeground: "#ffffff",
} as const satisfies SiteTheme;

/** Values for `style` on `<html>` (React/CSS custom properties). */
export function siteThemeCssVars(theme: SiteTheme): Record<string, string> {
  return {
    "--background": theme.background,
    "--surface": theme.surface,
    "--surface-hover": theme.surfaceHover,
    "--border": theme.border,
    "--foreground": theme.foreground,
    "--foreground-muted": theme.foregroundMuted,
    "--brand-primary": theme.brandPrimary,
    "--brand-foreground": theme.brandForeground,
  };
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
  areaName: "Min lilla by",

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

  /** Core UI colors — applied in root layout as CSS variables. */
  theme: siteTheme,

  /** Left sidebar links — single source of truth for routes and optional icons. */
  navigation: siteNavigation,
} as const;

export type SiteConfig = typeof siteConfig;
