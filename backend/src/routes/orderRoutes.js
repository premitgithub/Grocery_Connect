import express from "express";
import { getDeliveryOrders, updateOrderStatus, createOrder, getCustomerOrders, getOrderById, getShopOrders } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/customer", authMiddleware, getCustomerOrders);
router.get("/shop", authMiddleware, getShopOrders);
router.get("/delivery", getDeliveryOrders);
router.get("/:orderId", authMiddleware, getOrderById);
router.put("/:orderId/status", updateOrderStatus);

export default router;
