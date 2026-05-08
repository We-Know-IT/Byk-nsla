import "dotenv/config";

type EventsProviderName = "mock" | "ticketmaster";

const toEventsProvider = (value: string | undefined): EventsProviderName =>
  value === "ticketmaster" ? "ticketmaster" : "mock";

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

const toPositiveInt = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed > 0 && parsed <= 200) {
    return Math.floor(parsed);
  }
  return fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: toPort(process.env.PORT),
  eventsProvider: toEventsProvider(process.env.EVENTS_PROVIDER),
  weatherProvider: toWeatherProvider(process.env.WEATHER_PROVIDER),
  ticketmasterApiKey:
    process.env.TICKETMASTER_API_KEY ?? process.env.TICKETMASTER_CONSUMER_KEY ?? "",
  ticketmasterCity: process.env.TICKETMASTER_CITY ?? "Lund",
  ticketmasterCountryCode: process.env.TICKETMASTER_COUNTRY_CODE ?? "SE",
  ticketmasterKeyword: process.env.TICKETMASTER_KEYWORD?.trim() || "",
  ticketmasterPageSize: toPositiveInt(process.env.TICKETMASTER_SIZE, 20),
  ticketmasterSort: process.env.TICKETMASTER_SORT ?? "date,asc",
} as const;
