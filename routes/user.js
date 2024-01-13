import express from "express";
import {
  getUsers,
  getUserById,
  createUsers,
  updateCity,
  getWeatherByDate,
  activeNotification,
} from "../controllers/User.js";

import { login } from "../services/auth.js";
import { verifyToken } from "../services/auth.js";

//initializing routes
const router = express.Router();
//user login route
router.post("/login", login);
//get all user details with weather
router.get("/all", getUsers);
router.get("getUser/:id", getUserById);
router.post("/register", createUsers);
router.put("/:id", verifyToken, updateCity);
router.get("/:id/weather/:date", verifyToken, getWeatherByDate);
router.post("/:id/activate-notification", verifyToken, activeNotification);
export default router;
