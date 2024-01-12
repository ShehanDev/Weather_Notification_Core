// services/WeatherService.js
import axios from "axios";

export const fetchWeatherData = async (location) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );
    return {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
