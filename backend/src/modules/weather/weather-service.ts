import type { WeatherAdapter } from "../../adapters/contracts/weather-adapter.js";

export class WeatherService {
  constructor(private readonly adapter: WeatherAdapter) {}

  async getCurrentWeather() {
    const weather = await this.adapter.getCurrentWeather();
    return {
      location: weather.location,
      temperatureC: weather.temperatureC,
      condition: weather.condition,
    };
  }
}
