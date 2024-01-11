import User from "../models/userDetails.js";
import axios from "axios";
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { name, email, city } = req.body;
    const weatherData = await fetchWeatherData(city);

    const user = new User({
      name,
      email,
      city,
      weatherData: [{ timestamp: new Date(), ...weatherData }],
    });

    await user.save();
    res.status(201).json({ message: "User details stored successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//fetch the weather data
async function fetchWeatherData(location) {
  const apiKey = process.env.WEATHER_API_KEY;
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
  );
  return {
    temperature: response.data.main.temp,
    description: response.data.weather[0].description,
  };
}
