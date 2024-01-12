import User from "../models/userDetails.js";
import cron from "node-cron";

//get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
//get  user
export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//create users with getting weather data
export const createUser = async (name, email, city, weatherData) => {
  try {
    const user = new User({
      name,
      email,
      city,
      weatherData: [{ timestamp: new Date(), ...weatherData }],
    });
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//update city and its  wether data
export const updateUserCity = async (id, city, weatherData) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    user.city = city;
    user.weatherData.push({ timestamp: new Date(), ...weatherData });
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//get users wether by date
export const getUserWeatherByDate = async (id, date) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const selectedDate = new Date(date).toISOString().split("T")[0];

    const weatherData = user.weatherData.filter((entry) => {
      const entryDate = new Date(entry.timestamp).toISOString().split("T")[0];
      return entryDate === selectedDate;
    });

    return weatherData;
  } catch (error) {
    throw new Error(error.message);
  }
};

//email scheduler
export const scheduleWeatherNotification = async (user, sendWeatherReport) => {
  try {
    // Cancel existing cron job
    if (user.cronJob) {
      user.cronJob.stop();
    }

    // Schedule a new cron job for the user every 5 minutes
    user.cronJob = cron.schedule("*/1 * * * *", async () => {
      await sendWeatherReport(user.email, user.city);
    });

    // Save the user with the new cron job
    await user.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
