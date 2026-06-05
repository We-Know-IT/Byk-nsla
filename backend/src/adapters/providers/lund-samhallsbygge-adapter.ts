import type {
  ExternalSamhallsbyggeItem,
  SamhallsbyggeAdapter,
  SamhallsbyggeGeometry,
  SamhallsbyggeQueryOptions,
} from "../contracts/samhallsbygge-adapter.js";

const BYGGLOV_KUNGORELSE_URL =
  "https://geoportalen.lund.se/arcgis/rest/services/Bygglov/Extern_Bygglov_kungorelse/FeatureServer/0/query";
const GRANNHORANDE_URL =
  "https://geoportalen.lund.se/arcgis/rest/services/Bygglov/Extern_Bygglov_kungorelse/FeatureServer/1/query";
const DETALJPLAN_URL =
  "https://geoportalen.lund.se/arcgis/rest/services/GenerellaTjanster/Lund_Search/MapServer/9/query";

type ArcGisFeature = {
  id?: string | number;
  geometry?: unknown;
  properties?: Record<string, unknown>;
};

type ArcGisFeatureCollection = {
  features?: ArcGisFeature[];
};

const buildWhereClause = (
  options: SamhallsbyggeQueryOptions | undefined,
  searchFields: string[],
): string => {
  const area = options?.area?.trim();
  if (!area) {
    return "1=1";
  }

  const escaped = area.replaceAll("'", "''").toUpperCase();
  const predicates = searchFields.map((field) => `UPPER(${field}) LIKE '%${escaped}%'`);
  return predicates.join(" OR ");
};

const toGeoJsonQueryUrl = (
  baseUrl: string,
  options: SamhallsbyggeQueryOptions | undefined,
  searchFields: string[],
) => {
  const params = new URLSearchParams();
  params.set("where", buildWhereClause(options, searchFields));
  params.set("outFields", "*");
  params.set("returnGeometry", "true");
  params.set("f", "geojson");
  return `${baseUrl}?${params.toString()}`;
};

const toCleanString = (value: unknown): string | null => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return null;
};

const toIsoDate = (value: unknown): string | null => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const toGeometry = (value: unknown): SamhallsbyggeGeometry | null => {
  if (!value || typeof value !== "object") {
    return null;
  }
  const geometry = value as { type?: unknown; coordinates?: unknown };
  if (typeof geometry.type !== "string" || !("coordinates" in geometry)) {
    return null;
  }

  if (
    geometry.type === "Point" ||
    geometry.type === "LineString" ||
    geometry.type === "Polygon" ||
    geometry.type === "MultiPolygon"
  ) {
    return geometry as SamhallsbyggeGeometry;
  }

  return null;
};

const toArcGisFeatures = (value: unknown): ArcGisFeature[] => {
  if (!value || typeof value !== "object") {
    return [];
  }

  const payload = value as ArcGisFeatureCollection;
  if (!Array.isArray(payload.features)) {
    return [];
  }
  return payload.features;
};

const mapBygglovFeature = (
  feature: ArcGisFeature,
  source: "bygglov-kungorelse" | "grannhorande",
): ExternalSamhallsbyggeItem | null => {
  const properties = feature.properties ?? {};
  const reference = toCleanString(properties.Dnr) ?? toCleanString(feature.id);
  const title = toCleanString(properties.Arendemening) ?? "Bygglovsärende";
  const status = toCleanString(properties.Handelseslagkod) ?? "Under granskning";
  const publishedAt = toIsoDate(properties.Publiceringsdatum) ?? toIsoDate(properties.Handelsedatum);

  if (!reference) {
    return null;
  }

  return {
    id: `${source}-${reference}`,
    source,
    status,
    title,
    subtitle: toCleanString(properties.Fastighet) ?? toCleanString(properties.Anteckning),
    reference,
    publishedAt,
    externalUrl: null,
    geometry: toGeometry(feature.geometry),
  };
};

const mapDetaljplanFeature = (feature: ArcGisFeature): ExternalSamhallsbyggeItem => {
  const properties = feature.properties ?? {};
  const reference = toCleanString(properties.PA) ?? toCleanString(feature.id);
  const title =
    toCleanString(properties.RUBRIK) ??
    toCleanString(properties.POPULARNAMN) ??
    "Pågående detaljplan";

  return {
    id: `detaljplan-${reference ?? crypto.randomUUID()}`,
    source: "detaljplan",
    status: toCleanString(properties.STATUS) ?? toCleanString(properties.TYPAVPLAN),
    title,
    subtitle: toCleanString(properties.POPULARNAMN),
    reference,
    publishedAt: null,
    externalUrl: toCleanString(properties.URLEXTERN) ?? toCleanString(properties.URL),
    geometry: toGeometry(feature.geometry),
  };
};

async function fetchFeatureCollection(
  url: string,
  searchFields: string[],
  options?: SamhallsbyggeQueryOptions,
): Promise<ArcGisFeature[]> {
  const response = await fetch(toGeoJsonQueryUrl(url, options, searchFields), {
    cache: "no-store",
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Samhällsbygge-källa svarade med ${response.status}: ${message.slice(0, 200)}`);
  }
  const payload: unknown = await response.json();
  return toArcGisFeatures(payload);
}

export class LundSamhallsbyggeAdapter implements SamhallsbyggeAdapter {
  async getItems(options?: SamhallsbyggeQueryOptions): Promise<ExternalSamhallsbyggeItem[]> {
    const [kungorelseFeatures, grannhorandeFeatures, detaljplanFeatures] = await Promise.all([
      fetchFeatureCollection(BYGGLOV_KUNGORELSE_URL, ["Arendemening", "Fastighet", "Anteckning"], options),
      fetchFeatureCollection(GRANNHORANDE_URL, ["Arendemening", "Fastighet", "Anteckning"], options),
      fetchFeatureCollection(DETALJPLAN_URL, ["RUBRIK", "POPULARNAMN"], options),
    ]);

    const bygglovKungorelser = kungorelseFeatures
      .map((feature) => mapBygglovFeature(feature, "bygglov-kungorelse"))
      .filter((item): item is ExternalSamhallsbyggeItem => Boolean(item));
    const grannhoranden = grannhorandeFeatures
      .map((feature) => mapBygglovFeature(feature, "grannhorande"))
      .filter((item): item is ExternalSamhallsbyggeItem => Boolean(item));
    const detaljplaner = detaljplanFeatures.map(mapDetaljplanFeature);

    return [...bygglovKungorelser, ...grannhoranden, ...detaljplaner];
  }
}
