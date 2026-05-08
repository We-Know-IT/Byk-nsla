/**
 * Site branding and copy — edit this file when forking or deploying for a new municipality.
 * Keep asset files in `/web/public` and reference them with root-relative paths (e.g. `/brand/logo.svg`).
 */
export const siteConfig = {
  /** Shown in the top bar, document title, and other UI */
  name: "Lineroligt",

  htmlLang: "sv",

  metadata: {
    title: "Lineroligt",
    description: "Kommunportal — startsida, event och frivilligkraft",
  },

  brand: {
    /**
     * Shown in the square mark when `markImageSrc` is not set.
     * Use one character for the default layout, or a short abbreviation.
     */
    markLetter: "F",
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
   * Local area name used in headings (e.g. "Event i …", volontär copy).
   */
  areaName: "Linero",

  /** Static assets under `public/` */
  assets: {
    /** Fallback logo on frivilligkraft cards when no mission image is available */
    frivilligkraftCardFallbackLogo: "/frivilligkraft-card-logo.svg",
  },
} as const;

export type SiteConfig = typeof siteConfig;
