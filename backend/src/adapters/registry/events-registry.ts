import { env } from "../../config/env.js";
import type { EventsAdapter } from "../contracts/events-adapter.js";
import { MockEventsAdapter } from "../providers/mock-events-adapter.js";
import { TicketmasterEventsAdapter } from "../providers/ticketmaster-events-adapter.js";

export const getEventsAdapter = (): EventsAdapter => {
  switch (env.eventsProvider) {
    case "ticketmaster":
      return new TicketmasterEventsAdapter();
    case "mock":
    default:
      return new MockEventsAdapter();
  }
};
