import express from "express";
import {
  deleteUser,
  forgetPassword,
  getFilteredUsers,
  getUserData,
  login,
  logout,
  Profile,
  resendEmail,
  resetPassword,
  signup,
  updateAdminRole,
  verifyemail,
} from "../controller/authcontroller.js";
import isAuthenticated, { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", isAuthenticated, verifyemail);
router.get("/resend-email", isAuthenticated, resendEmail);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.get("/profile", isAuthenticated, Profile);
router.get("/logout", isAuthenticated, logout);
router.get("/fetchusers", isAuthenticated, verifyAdmin, getFilteredUsers);
router.get("/getUserdata/:userID", isAuthenticated, verifyAdmin, getUserData);
router.delete("/deleteUser/:userID", isAuthenticated, verifyAdmin, deleteUser);
router.post(
  "/updateRole/:userID",
  isAuthenticated,
  verifyAdmin,
  updateAdminRole
);

export default router;
