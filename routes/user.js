import express from "express";
//initializing routes
const router = express.Router();
import { getUsers, createUsers } from "../controllers/user.js";
router.get("/", getUsers);
router.post("/", createUsers);

export default router;
