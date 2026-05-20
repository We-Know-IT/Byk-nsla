import { prisma } from "../../lib/prisma.js";

export class SiteThemeRepository {
  async getSelection() {
    return prisma.siteThemeSelection.findUnique({
      where: { id: 1 },
    });
  }

  async setSelection(activeThemeKey: string) {
    return prisma.siteThemeSelection.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        activeThemeKey,
      },
      update: {
        activeThemeKey,
      },
    });
  }
}
