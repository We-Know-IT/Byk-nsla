import { SiteNavigationRepository } from "./site-navigation-repository.js";

const toPageMap = (pages: Array<{ key: string; display: boolean }>) =>
  Object.fromEntries(pages.map((page) => [page.key, page.display]));

export class SiteNavigationService {
  constructor(private readonly repository = new SiteNavigationRepository()) {}

  async getNavigationState() {
    const pages = await this.repository.getPages();
    return { pages: toPageMap(pages) };
  }

  async saveNavigationState(pages: Record<string, boolean>) {
    const entries = Object.entries(pages).map(([key, display]) => ({
      key,
      display,
    }));

    await this.repository.savePages(entries);
    return this.getNavigationState();
  }
}