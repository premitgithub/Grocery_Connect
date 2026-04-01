import express from "express";
import { ProductListing } from "../controllers/productController.js";
const router = express.Router();

// ✅ GET all products
router.get("/", ProductListing);

// ✅ POST add product
import { authMiddleware as verifyToken } from "../middlewares/authMiddleware.js";
import { addProduct } from "../controllers/productController.js";
router.post("/", verifyToken, addProduct);

export default router;
