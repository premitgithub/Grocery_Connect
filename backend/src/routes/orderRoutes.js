import express from "express";
import { getDeliveryOrders, updateOrderStatus, createOrder, getCustomerOrders } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/customer", authMiddleware, getCustomerOrders);
router.get("/delivery", getDeliveryOrders);
router.put("/:orderId/status", updateOrderStatus);

export default router;
