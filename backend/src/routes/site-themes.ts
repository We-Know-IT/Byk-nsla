import { Router } from "express";
import { SiteThemeService } from "../modules/site-theme/site-theme-service.js";
import { sendError, sendSuccess } from "../shared/http.js";

export const siteThemesRouter = Router();
const siteThemeService = new SiteThemeService();

const readThemeKey = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

siteThemesRouter.get("/", async (_req, res, next) => {
  try {
    const state = await siteThemeService.getThemeState();
    return sendSuccess(res, state);
  } catch (error) {
    return next(error);
  }
});

siteThemesRouter.get("/active", async (_req, res, next) => {
  try {
    const state = await siteThemeService.getThemeState();
    return sendSuccess(res, state.activeTheme);
  } catch (error) {
    return next(error);
  }
});

siteThemesRouter.put("/active", async (req, res, next) => {
  const key = readThemeKey(req.body?.key);
  if (key === null) {
    return sendError(res, "Provide a theme key to activate.", 400);
  }

  try {
    const state = await siteThemeService.activateTheme(key);
    return sendSuccess(res, state);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Unknown theme key:")) {
      return sendError(res, error.message, 400);
    }
    return next(error);
  }
});
