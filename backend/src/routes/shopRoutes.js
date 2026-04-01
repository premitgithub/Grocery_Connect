import express from "express";
import { createShop, getShopByOwner, getAllShops, getShopById, updateShop } from "../controllers/shopController.js";
import { authMiddleware as verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllShops);
router.get("/:id", getShopById);

// Protected routes
router.post("/", verifyToken, createShop);
router.get("/owner/me", verifyToken, getShopByOwner);
router.put("/owner/me", verifyToken, updateShop);

export default router;
