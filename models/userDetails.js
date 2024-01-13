import mongoose from "mongoose";

//creating schema for user
const userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: String,
  weatherData: [{ timestamp: Date, temperature: Number, description: String }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
//covert schema into the model

const userDetails = mongoose.model("userSchema", userSchema);

export default userDetails;
