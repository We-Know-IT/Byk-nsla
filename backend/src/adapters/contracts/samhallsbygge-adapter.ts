export type SamhallsbyggeSource = "bygglov-kungorelse" | "grannhorande" | "detaljplan";

export type SamhallsbyggeGeometry =
  | {
      type: "Point";
      coordinates: number[];
    }
  | {
      type: "LineString";
      coordinates: number[][];
    }
  | {
      type: "Polygon";
      coordinates: number[][][];
    }
  | {
      type: "MultiPolygon";
      coordinates: number[][][][];
    };

export type SamhallsbyggeQueryOptions = {
  /**
   * Future seam for API-side area narrowing (e.g. Linero-only query params).
   * Intentionally optional and not forced in phase 1.
   */
  area?: string;
};

export type ExternalSamhallsbyggeItem = {
  id: string;
  source: SamhallsbyggeSource;
  status: string | null;
  title: string;
  subtitle: string | null;
  reference: string | null;
  publishedAt: string | null;
  externalUrl: string | null;
  geometry: SamhallsbyggeGeometry | null;
};

export interface SamhallsbyggeAdapter {
  getItems(options?: SamhallsbyggeQueryOptions): Promise<ExternalSamhallsbyggeItem[]>;
}
