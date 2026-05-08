import { env } from "../../config/env.js";
import type { WeatherAdapter } from "../contracts/weather-adapter.js";
import { MockWeatherAdapter } from "../providers/mock-weather-adapter.js";

export const getWeatherAdapter = (): WeatherAdapter => {
  switch (env.weatherProvider) {
    case "mock":
    default:
      return new MockWeatherAdapter();
  }
};
