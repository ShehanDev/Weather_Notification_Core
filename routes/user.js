import express from "express";
import {
  getUsers,
  getUserById,
  createUsers,
  updateCity,
  getWeatherByDate,
  activeNotification,
} from "../controllers/userController.js";
import { login } from "../services/auth.js";
import { verifyToken } from "../services/auth.js";
//initializing routes
const router = express.Router();

//user login route
router.post("/login", login);
//get all user details with weather
router.get("/all", getUsers);
//get user details by id
router.get("/getUser", getUserById);
//create users
router.post("/register", createUsers);
// Update user's city by ID
router.put("/update/:id", verifyToken, updateCity);
// Get user's weather data for a specific date
router.get("/:id/weather/:date", verifyToken, getWeatherByDate);
// Activate email notifications for users and send weather updates every 3 hours
router.post("/email/activate/:id", verifyToken, activeNotification);
export default router;
