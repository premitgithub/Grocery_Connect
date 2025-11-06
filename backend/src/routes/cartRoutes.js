import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🛒 Add item to cart
router.post("/add", addToCart);

// 📦 Get all items in user's cart
router.get("/", authMiddleware, getCart);

// ❌ Remove item from cart
router.delete("/:productId", authMiddleware, removeFromCart);

export default router;
