import "dotenv/config";

type EventsProviderName = "mock";

const toEventsProvider = (value: string | undefined): EventsProviderName =>
  value === "mock" ? value : "mock";

type WeatherProviderName = "mock";

const toWeatherProvider = (value: string | undefined): WeatherProviderName =>
  value === "mock" ? value : "mock";

const toPort = (value: string | undefined): number => {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return 4000;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: toPort(process.env.PORT),
  eventsProvider: toEventsProvider(process.env.EVENTS_PROVIDER),
  weatherProvider: toWeatherProvider(process.env.WEATHER_PROVIDER),
} as const;
