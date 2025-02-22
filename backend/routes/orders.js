import express from "express";
import {
  cancelOrder,
  capturePayment,
  createNewOrder,
  fetchAllTransactions,
  getOrders,
  updateOrderStatus,
} from "../controller/orders.js";
import isAuthenticated, { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/createNewOrder", isAuthenticated, createNewOrder);
router.post("/capturePayment", isAuthenticated, capturePayment);
router.get("/getOrderByUserID/:userID", isAuthenticated, getOrders);
router.post("/deleteOrder/:orderID", isAuthenticated, cancelOrder);
router.get(
  "/getAllTransactions",
  isAuthenticated,
  verifyAdmin,
  fetchAllTransactions
);
router.post(
  "/updateOrderStatus",
  isAuthenticated,
  verifyAdmin,
  updateOrderStatus
);

export default router;
