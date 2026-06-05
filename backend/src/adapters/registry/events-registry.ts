import { env } from "../../config/env.js";
import type { EventsAdapter } from "../contracts/events-adapter.js";
import { MockEventsAdapter } from "../providers/mock-events-adapter.js";

export const getEventsProviderName = (): string => env.eventsProvider;

export const getEventsAdapter = (): EventsAdapter => {
  switch (env.eventsProvider) {
    case "mock":
    default:
      return new MockEventsAdapter();
  }
};
