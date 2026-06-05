import { Router } from "express";
import { getSamhallsbyggeAdapter } from "../adapters/registry/samhallsbygge-registry.js";
import { SamhallsbyggeService } from "../modules/samhallsbygge/samhallsbygge-service.js";
import { sendSuccess } from "../shared/http.js";

export const samhallsbyggeRouter = Router();

samhallsbyggeRouter.get("/", async (req, res, next) => {
  try {
    const service = new SamhallsbyggeService(getSamhallsbyggeAdapter());
    const area = typeof req.query.area === "string" ? req.query.area : undefined;
    const items = await service.listItems({ area });

    return sendSuccess(res, items, {
      provider: "lund-geoportalen",
      adapterBoundary: true,
      domains: ["bygglov-kungorelse", "grannhorande", "detaljplan"],
    });
  } catch (error) {
    return next(error);
  }
});
