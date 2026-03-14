export type Scale = 'Celsius' | 'Fahrenheit'

export interface WeatherResponse {
  temperature: number;
  scale: Scale;
}