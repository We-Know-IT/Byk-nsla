export type FrivilligkraftTeaser = {
  id: string;
  title: string;
  description: string;
  organization: string | null;
  location: string | null;
  frequency: string | null;
  startDate: string | null;
  missionUrl: string;
  imageUrl: string | null;
};

type FrivilligkraftApiSuccess = {
  success: true;
  data: FrivilligkraftTeaser[];
};

type FrivilligkraftApiError = {
  success: false;
  error: {
    message: string;
  };
};

type FrivilligkraftApiResponse = FrivilligkraftApiSuccess | FrivilligkraftApiError;

const getAppBaseUrl = () => process.env.APP_URL ?? "http://localhost:3000";

export async function getFrivilligkraftTeasers(): Promise<{
  teasers: FrivilligkraftTeaser[];
  error: string | null;
}> {
  try {
    const response = await fetch(new URL("/api/frivilligkraft/teaser", getAppBaseUrl()).toString(), {
      cache: "no-store",
    });

    const payload: FrivilligkraftApiResponse = await response.json();

    if (!response.ok || !payload.success) {
      return {
        teasers: [],
        error: payload.success ? "Kunde inte hämta frivilligkraftsdata." : payload.error.message,
      };
    }

    return { teasers: payload.data, error: null };
  } catch {
    return {
      teasers: [],
      error: "Kunde inte ansluta till frivilligkraftstjänsten just nu.",
    };
  }
}
