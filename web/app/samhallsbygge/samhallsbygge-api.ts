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

export type SamhallsbyggeItem = {
  id: string;
  source: "bygglov-kungorelse" | "grannhorande" | "detaljplan";
  categoryLabel: string;
  status: string;
  title: string;
  subtitle: string | null;
  reference: string | null;
  publishedAt: string | null;
  externalUrl: string | null;
  geometry: SamhallsbyggeGeometry | null;
};

type SamhallsbyggeApiSuccess = {
  success: true;
  data: SamhallsbyggeItem[];
};

type SamhallsbyggeApiError = {
  success: false;
  error: {
    message: string;
  };
};

type SamhallsbyggeApiResponse = SamhallsbyggeApiSuccess | SamhallsbyggeApiError;

const getAppBaseUrl = () => process.env.APP_URL ?? "http://localhost:3000";

export async function getSamhallsbyggeItems(): Promise<{
  items: SamhallsbyggeItem[];
  error: string | null;
}> {
  try {
    const response = await fetch(new URL("/api/samhallsbygge", getAppBaseUrl()).toString(), {
      cache: "no-store",
    });

    const payload: SamhallsbyggeApiResponse = await response.json();

    if (!response.ok || !payload.success) {
      return {
        items: [],
        error: payload.success ? "Kunde inte hämta samhällsbyggnadsdata." : payload.error.message,
      };
    }

    return { items: payload.data, error: null };
  } catch {
    return {
      items: [],
      error: "Kunde inte ansluta till samhällsbyggnadstjänsten just nu.",
    };
  }
}
