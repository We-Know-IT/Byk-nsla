import type { ExternalWeather, WeatherAdapter } from "../contracts/weather-adapter.js";

const mockWeather: ExternalWeather = {
  location: "Linero",
  temperatureC: 16,
  condition: "Lätt molnighet",
};

export class MockWeatherAdapter implements WeatherAdapter {
  async getCurrentWeather(): Promise<ExternalWeather> {
    return mockWeather;
  }
}
