import userDetails from "../models/userDetails.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userDetails.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUsers = async (req, res) => {
  const user = req.body;
  const newUser = new userDetails(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
