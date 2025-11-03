import express from "express";
import { ProductListing } from "../controllers/productController.js";
const router = express.Router();

// ✅ GET all products
router.get("/", ProductListing);

export default router;
