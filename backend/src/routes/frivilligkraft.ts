import { Router } from "express";
import { getFrivilligkraftAdapter } from "../adapters/registry/frivilligkraft-registry.js";
import { FrivilligkraftService } from "../modules/frivilligkraft/frivilligkraft-service.js";
import { sendSuccess } from "../shared/http.js";

export const frivilligkraftRouter = Router();

frivilligkraftRouter.get("/teaser", async (_req, res, next) => {
  try {
    const service = new FrivilligkraftService(getFrivilligkraftAdapter());
    const teasers = await service.listTeasers();

    return sendSuccess(res, teasers, {
      provider: "frivilligkraft",
      adapterBoundary: true,
    });
  } catch (error) {
    return next(error);
  }
});
