/**
 * Site branding and copy — edit this file when forking or deploying for a new municipality.
 * Keep asset files in `/web/public` and reference them with root-relative paths (e.g. `/brand/logo.svg`).
 */
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
} as const;

export type SiteConfig = typeof siteConfig;
