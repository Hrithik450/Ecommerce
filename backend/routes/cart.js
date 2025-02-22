import express from "express";
import {
  addToCart,
  deleteItem,
  fetchCart,
  fetchUserCart,
  updateCart,
} from "../controller/cart.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.post("/addToCart", isAuthenticated, addToCart);
router.get("/fetchCart/:userID", isAuthenticated, fetchCart);
router.put("/updateCart", isAuthenticated, updateCart);
router.delete("/deleteItem/:userID/:productID", isAuthenticated, deleteItem);
router.get("/fetchUserCart/:userID/:productID", isAuthenticated, fetchUserCart);

export default router;
