// import User from "../models/userDetails.js";
import * as WeatherService from "../services/weatherService.js";
import * as UserService from "../services/userService.js";
import * as MailService from "../services/mailService.js";
import bcrypt from "bcrypt";

//get all users
export const getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get userData by id
export const getUserById = async (req, res) => {
  const id = req.body.id;
  // sending the user id in the request body
  try {
    const user = await UserService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//create users with getting weather data
export const createUsers = async (req, res) => {
  const { name, password, email, city } = req.body;

  const hashedPw = await bcrypt.hash(password, 10);
  try {
    const weatherData = await WeatherService.fetchWeatherData(city);

    const user = await UserService.createUser(
      name,
      email,
      password,
      city,
      weatherData
    );
    res.status(200).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User Location
export const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { city } = req.body;
    const user = await UserService.updateUserCity(
      id,
      city,
      await WeatherService.fetchWeatherData(city)
    );

    res.status(200).json({ message: "User location updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User Weather Data for a Given Day
export const getWeatherByDate = async (req, res) => {
  try {
    const { id, date } = req.params;
    const weatherData = await UserService.getUserWeatherByDate(id, date);

    res.status(200).json({ weatherData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//activate-notification to send email
export const activeNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await UserService.scheduleWeatherNotification(user, async (email, city) => {
      await MailService.sendWeatherReport(
        email,
        city,
        WeatherService.fetchWeatherData
      );
    });

    res
      .status(200)
      .json({ message: "Weather notification activated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
