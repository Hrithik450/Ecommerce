import express from "express";
import {
  createAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../controller/address.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.post("/createAddress", createAddress);
router.get("/fetchAllAdress/:userID", fetchAllAddress);
router.put("/editAddress/:userID/:AddressID", editAddress);
router.delete("/deleteAddress/:userID/:AddressID", deleteAddress);

export default router;
