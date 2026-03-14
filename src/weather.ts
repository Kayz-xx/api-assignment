import axios from 'axios';
import type {Scale, WeatherResponse} from './types.js';

export const getTempByZip = async (zip: string, scale: Scale = "Celsius"): Promise<WeatherResponse> => {
    const apiKey = process.env.WEATHER_API_KEY
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${zip}`;

    const { data } = await axios.get(url)

    const temperature = scale === "Celsius" ? data.current.temp_c : data.current.temp_f;

    return {
        temperature,
        scale
  };
}