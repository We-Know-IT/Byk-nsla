import { Router } from "express";
import { getWeatherAdapter } from "../adapters/registry/weather-registry.js";
import { WeatherService } from "../modules/weather/weather-service.js";
import { sendSuccess } from "../shared/http.js";

export const weatherRouter = Router();

weatherRouter.get("/", async (_req, res, next) => {
  try {
    const service = new WeatherService(getWeatherAdapter());
    const weather = await service.getCurrentWeather();

    return sendSuccess(res, weather, {
      provider: "mock",
      adapterBoundary: true,
    });
  } catch (error) {
    return next(error);
  }
});
