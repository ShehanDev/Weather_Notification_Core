import express from "express";
import {
  getUsers,
  getUserById,
  createUsers,
  updateCity,
  getWeatherByDate,
  activeNotification,
} from "../controllers/User.js";

//initializing routes
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUsers);
router.put("/:id", updateCity);
router.get("/:id/weather/:date", getWeatherByDate);
router.post("/:id/activate-notification", activeNotification);
export default router;
