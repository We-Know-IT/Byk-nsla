export type ExternalTrafficStatus = {
  area: string;
  level: "low" | "medium" | "high";
  message: string;
};

export interface TrafficAdapter {
  getStatus(): Promise<ExternalTrafficStatus>;
}
