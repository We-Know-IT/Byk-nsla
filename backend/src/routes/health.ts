import { Router } from "express";
import { env } from "../config/env.js";
import { sendSuccess } from "../shared/http.js";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  return sendSuccess(res, {
    status: "ok",
    service: "lineroligt-backend",
    environment: env.nodeEnv,
  });
});
