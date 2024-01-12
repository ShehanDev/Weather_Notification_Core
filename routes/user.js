import express from "express";
import {
  getUsers,
  createUsers,
  updateCity,
  getWeatherByDate,
} from "../controllers/User.js";

//initializing routes
const router = express.Router();

router.get("/", getUsers);
router.post("/", createUsers);
router.put("/:id", updateCity);
router.get("/:id/weather/:date", getWeatherByDate);
export default router;
