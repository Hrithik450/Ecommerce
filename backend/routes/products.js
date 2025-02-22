import express from "express";
import {
  createProduct,
  deleteProduct,
  getFilteredProducts,
  getHeroProducts,
  getProductById,
  getProductsBySection,
  randomProducts,
  updateProduct,
} from "../controller/product.js";

const router = express.Router();

router.post("/createproduct", createProduct);
router.post("/updateproduct/:productID", updateProduct);
router.delete("/deleteproduct/:productID", deleteProduct);
router.get("/get", getFilteredProducts);
router.get("/get/getheroproducts", getHeroProducts);
router.post("/get/sectionproducts", getProductsBySection);
router.get("/get/randomProducts", randomProducts);
router.get("/get/:productID", getProductById);

export default router;
