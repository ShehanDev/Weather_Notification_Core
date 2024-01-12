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

// Update User Location
export const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { city } = req.body;
    console.log("Code works");

    const user = await User.findById(id);
    // console.log("User:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const weatherData = await fetchWeatherData(city);

    user.city = city;
    console.log(city);
    user.weatherData.push({ timestamp: new Date(), ...weatherData });
    console.log("Weather Data:", weatherData);

    console.log(user);
    await user.save();

    res.status(200).json({ message: "User location updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get User Weather Data for a Given Day
//app.get('/user/:id/weather/:date',
export const getWeatherByDate = async (req, res) => {
  try {
    const { id, date } = req.params;

    console.log(id, date);

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const selectedDate = new Date(date);
    const weatherData = user.weatherData.filter((entry) => {
      const entryDate = new Date(entry.timestamp);
      return entryDate.toDateString() === selectedDate.toDateString();
    });

    res.status(200).json({ weatherData });
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
