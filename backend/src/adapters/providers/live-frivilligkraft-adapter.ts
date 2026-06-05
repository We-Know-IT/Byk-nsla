import type {
  ExternalFrivilligkraftMissionTeaser,
  FrivilligkraftAdapter,
} from "../contracts/frivilligkraft-adapter.js";

const FRIVILLIGKRAFT_TEASER_URL = "https://frivilligkraft.lund.se/api/Mission/Teaser";

export class LiveFrivilligkraftAdapter implements FrivilligkraftAdapter {
  async getMissionTeasers(): Promise<ExternalFrivilligkraftMissionTeaser[]> {
    const response = await fetch(FRIVILLIGKRAFT_TEASER_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Frivilligkraft teasers: ${response.status} ${response.statusText}`,
      );
    }

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) {
      throw new Error("Unexpected Frivilligkraft response format");
    }

    return payload as ExternalFrivilligkraftMissionTeaser[];
  }
}
