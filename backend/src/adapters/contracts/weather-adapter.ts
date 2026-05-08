export type ExternalWeather = {
  location: string;
  temperatureC: number;
  condition: string;
};

export interface WeatherAdapter {
  getCurrentWeather(): Promise<ExternalWeather>;
}
