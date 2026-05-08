import type {
  ExternalSamhallsbyggeItem,
  SamhallsbyggeAdapter,
  SamhallsbyggeSource,
} from "../../adapters/contracts/samhallsbygge-adapter.js";

export type SamhallsbyggeItem = {
  id: string;
  source: SamhallsbyggeSource;
  categoryLabel: string;
  status: string;
  title: string;
  subtitle: string | null;
  reference: string | null;
  publishedAt: string | null;
  externalUrl: string | null;
  geometry: ExternalSamhallsbyggeItem["geometry"];
};

const categoryLabelBySource: Record<SamhallsbyggeSource, string> = {
  "bygglov-kungorelse": "Bygglov kungörelser",
  grannhorande: "Grannhörande",
  detaljplan: "Pågående detaljplaner",
};

const sourceOrder: Record<SamhallsbyggeSource, number> = {
  "bygglov-kungorelse": 0,
  grannhorande: 1,
  detaljplan: 2,
};

export class SamhallsbyggeService {
  constructor(private readonly adapter: SamhallsbyggeAdapter) {}

  async listItems(): Promise<SamhallsbyggeItem[]> {
    const items = await this.adapter.getItems();

    return items
      .map((item) => ({
        id: item.id,
        source: item.source,
        categoryLabel: categoryLabelBySource[item.source],
        status: item.status ?? "Under granskning",
        title: item.title,
        subtitle: item.subtitle,
        reference: item.reference,
        publishedAt: item.publishedAt,
        externalUrl: item.externalUrl,
        geometry: item.geometry,
      }))
      .sort((a, b) => {
        const aDate = a.publishedAt ? Date.parse(a.publishedAt) : NaN;
        const bDate = b.publishedAt ? Date.parse(b.publishedAt) : NaN;
        if (Number.isFinite(aDate) && Number.isFinite(bDate)) {
          return bDate - aDate;
        }
        if (Number.isFinite(aDate)) {
          return -1;
        }
        if (Number.isFinite(bDate)) {
          return 1;
        }
        return sourceOrder[a.source] - sourceOrder[b.source];
      });
  }
}
