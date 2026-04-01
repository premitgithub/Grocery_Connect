import express from "express";
import { getUserNotifications, markAsRead, markAllAsRead } from "../controllers/notificationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); // All notification routes require authentication

router.get("/", getUserNotifications);
router.put("/mark-all-read", markAllAsRead);
router.put("/:notificationId/read", markAsRead);

export default router;
