import type { FrivilligkraftAdapter } from "../../adapters/contracts/frivilligkraft-adapter.js";

export type FrivilligkraftTeaser = {
  id: string;
  title: string;
  description: string;
  organization: string | null;
  location: string | null;
  frequency: string | null;
  startDate: string | null;
  missionUrl: string;
  /** Resolved absolute URL for mission/group image, when upstream provides one */
  imageUrl: string | null;
};

const toLocation = (mission: {
  geoLocations?: { name?: string }[];
  cityArea?: string;
  location?: string;
}): string | null => {
  const geoNames = mission.geoLocations
    ?.map((geoLocation) => geoLocation.name?.trim())
    .filter((name): name is string => Boolean(name));

  const fromGeoLocations = geoNames?.join(", ");
  return fromGeoLocations ?? mission.cityArea?.trim() ?? mission.location?.trim() ?? null;
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

const FRIVILLIGKRAFT_ORIGIN = "https://frivilligkraft.lund.se";

const SHARED_GROUP_LOGO_PREFIX = "/SharedAssets/logo";

/**
 * `group.image` from the teaser API is usually a bare filename (e.g. `group_logo_63.jpg`).
 * The official Frivilligkraft web client builds the URL as `/SharedAssets/logo/` + filename.
 * Resolving only against the site root (e.g. `/group_logo_63.jpg`) returns the SPA HTML, so images fail in the browser.
 */
const resolveMissionImageUrl = (raw: unknown): string | null => {
  if (typeof raw !== "string") {
    return null;
  }
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }
  try {
    if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
      return new URL(trimmed).href;
    }
    if (trimmed.startsWith("//")) {
      return new URL(`https:${trimmed}`).href;
    }
    if (trimmed.startsWith("/")) {
      return new URL(trimmed, FRIVILLIGKRAFT_ORIGIN).href;
    }
    // Bare filename from API
    return new URL(`${SHARED_GROUP_LOGO_PREFIX}/${trimmed}`, FRIVILLIGKRAFT_ORIGIN).href;
  } catch {
    return null;
  }
};

const toDescription = (description: string | undefined, ingress: string | undefined): string => {
  const primary = description?.trim();
  if (primary) {
    return primary;
  }
  const fallback = ingress?.trim();
  if (fallback) {
    return fallback;
  }
  return "Ingen beskrivning tillgänglig.";
};

export class FrivilligkraftService {
  constructor(private readonly adapter: FrivilligkraftAdapter) {}

  async listTeasers(): Promise<FrivilligkraftTeaser[]> {
    const missions = await this.adapter.getMissionTeasers();

    return missions
      .map((mission) => {
        const id = toCleanString(mission.id);
        const title = toCleanString(mission.header) ?? toCleanString(mission.title);

        if (!id || !title) {
          return null;
        }

        return {
          id,
          title,
          description: toDescription(mission.description, mission.ingress),
          organization: mission.group?.name?.trim() ?? mission.originator?.trim() ?? null,
          location: toLocation(mission),
          frequency:
            mission.frequency?.trim() ??
            mission.missionFrequency?.name?.trim() ??
            mission.timeCommitment?.trim() ??
            null,
          startDate: mission.startDate?.trim() ?? null,
          missionUrl: `https://frivilligkraft.lund.se/mission/${id}`,
          imageUrl: resolveMissionImageUrl(mission.group?.image),
        };
      })
      .filter((mission): mission is FrivilligkraftTeaser => Boolean(mission));
  }
}
