import express from "express";
import { sendOtp, verifyOtp } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// example protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
