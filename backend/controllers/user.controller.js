import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

//Description: Authenticate User/set token
//route POST /api/users/auth
//Access: Public

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json({ success: true, users });
});

//Description: Authenticate User/set token
//route POST /api/users/auth
//Access: Public

const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Authenticate User route" });
});

//Description: Register a new user
//route POST /api/users
//Access: Public

const registerUser = asyncHandler(async (req, res, next) => {
  const user = req.body;

  if (!user.name || !user.email || !user.password) {
    res.status(400).json({ error: "Please fill all required field" });
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("An error occurred while creating a new user", error.message);
    next(error);
  }
});

//Description: Logout a user
//route POST /api/users/logout
//Access: Public

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout User route" });
});

//Description: Get User profie
//route GET /api/users/profile
//Access: Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get User Profile" });
});

//Description: Update User profie
//route PUT /api/users/profile
//Access: Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update User Profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
};
