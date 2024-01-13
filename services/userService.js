import User from "../models/userDetails.js";
import cron from "node-cron";
import bcrypt from "bcrypt";

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
export const createUser = async (name, email, password, city, weatherData) => {
  const hashedPw = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      name,
      email,
      password: hashedPw,
      city,
      weatherData: [{ timestamp: new Date(), ...weatherData }],
    });
    await user.save();
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

// find user by name
export const getUserByName = async (name) => {
  try {
    const user = await User.findOne({ name: name });

    if (!user) {
      // User not found
      return null;
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//password validate
export const validatePassword = async (password, hashedPw) => {
  try {
    console.log("password", password);
    console.log("hashedPassword", hashedPw);
    const isMatch = await bcrypt.compare(password, hashedPw);
    console.log("validate  user", isMatch);
    return isMatch;
  } catch (error) {
    console.error("Error comparing password:", error.message);
    throw new Error("Internal Server Error");
  }
};
