import { Router } from "express";
import {
  getEventsAdapter,
  getEventsProviderName,
} from "../adapters/registry/events-registry.js";
import { EventsService } from "../modules/events/events-service.js";
import { sendSuccess } from "../shared/http.js";

export const eventsRouter = Router();

eventsRouter.get("/", async (_req, res, next) => {
  try {
    const service = new EventsService(getEventsAdapter());
    const events = await service.listEvents();

    return sendSuccess(res, events, {
      provider: getEventsProviderName(),
      adapterBoundary: true,
    });
  } catch (error) {
    return next(error);
  }
});
