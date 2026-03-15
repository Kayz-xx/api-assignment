import axios from "axios";
import { Scale, WeatherResponse } from "../utils/types";

export const getTempByZip = async (
  zip: string,
  scale: Scale = "Fahrenheit",
): Promise<WeatherResponse> => {
  const apiKey = process.env.WEATHER_API_KEY;
  // use native zip call
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${zip}`;

  try {
    const { data } = await axios.get(url);

    const temperature =
      scale === "Celsius" ? data.current.temp_c : data.current.temp_f;
    return {
      temperature,
      scale,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `weatherAPI error: ${error.response?.status} - ${error.response?.data?.error?.message ?? "Unknown error"}`,
      );
    }
    throw new Error("An unexpected error occurred");
  }
};
