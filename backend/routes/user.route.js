import express from "express";
const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/auth", authUser);
router.post("/", registerUser);
router.get("/", getUsers);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
