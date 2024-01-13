import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

//db connection
mongoose
  .connect(CONNECTION_URL)
  .then(() => console.log("connected to Database!"))
  .catch((err) => {
    console.log(err);
  });

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Home api");
});

//start server
app.listen(PORT, () => console.log(`server up and Running at ${PORT} `));
