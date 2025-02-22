import jwt from "jsonwebtoken";
import db from "../database/firebase.js";
import { doc, getDoc } from "firebase/firestore";

const isAuthenticated = async (req, res, next) => {
  const token = await (req.cookies?.ANOXID ||
    req.headers?.authorization?.split(" ")[1]);

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "User is not logged in",
      user: null,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Session expired, please login again",
      user: null,
    });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.userID;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const UserDocRef = doc(db, "users", userId);
    const UserSnapShot = await getDoc(UserDocRef);

    if (!UserSnapShot.exists()) {
      return res.status(404).json({ message: "User not found!" });
    }

    const userData = UserSnapShot.data();

    if (userData?.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default isAuthenticated;
