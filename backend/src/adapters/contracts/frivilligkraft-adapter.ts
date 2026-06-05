export type ExternalFrivilligkraftGroup = {
  id?: string;
  name?: string;
  image?: string;
};

export type ExternalFrivilligkraftGeoLocation = {
  name?: string;
};

export type ExternalFrivilligkraftMissionFrequency = {
  name?: string;
};

export type ExternalFrivilligkraftMissionTeaser = {
  id?: string | number;
  header?: string;
  title?: string;
  ingress?: string;
  description?: string;
  startDate?: string;
  frequency?: string;
  cityArea?: string;
  location?: string;
  timeCommitment?: string;
  originator?: string;
  group?: ExternalFrivilligkraftGroup;
  geoLocations?: ExternalFrivilligkraftGeoLocation[];
  missionFrequency?: ExternalFrivilligkraftMissionFrequency;
};

export interface FrivilligkraftAdapter {
  getMissionTeasers(): Promise<ExternalFrivilligkraftMissionTeaser[]>;
}
