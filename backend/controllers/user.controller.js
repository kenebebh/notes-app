import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

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
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePasswords(password))) {
    generateToken(res, user.id);
    res.status(201).json({ success: true, data: user });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
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
    if (newUser) {
      generateToken(res, newUser.id);
      res.status(201).json({ success: true, data: newUser });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (error) {
    console.error("An error occurred while creating a new user", error.message);
    next(error);
  }
});

//Description: Logout a user
//route POST /api/users/logout
//Access: Public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out user" });
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
