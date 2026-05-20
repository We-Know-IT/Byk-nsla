import {
  defaultSiteThemeKey,
  getSiteThemePreset,
  isSiteThemeKey,
  siteThemePresets,
} from "./site-theme-presets.js";
import { SiteThemeRepository } from "./site-theme-repository.js";

export class SiteThemeService {
  constructor(private readonly repository = new SiteThemeRepository()) {}

  async getThemeState() {
    const selection = await this.repository.getSelection();
    const activeThemeKey =
      selection && isSiteThemeKey(selection.activeThemeKey)
        ? selection.activeThemeKey
        : defaultSiteThemeKey;

    const activeTheme = getSiteThemePreset(activeThemeKey);

    return {
      activeThemeKey,
      activeTheme,
      themes: siteThemePresets.map((preset) => ({
        ...preset,
        isActive: preset.key === activeThemeKey,
      })),
    };
  }

  async activateTheme(key: string) {
    if (!isSiteThemeKey(key)) {
      throw new Error(`Unknown theme key: ${key}`);
    }

    await this.repository.setSelection(key);
    return this.getThemeState();
  }
}
