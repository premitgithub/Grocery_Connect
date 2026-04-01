import express from "express";
import { sendOtp, verifyOtp, setUserRole, updateProfile, updateOnlineStatus } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/set-role", setUserRole);
router.post("/update-profile", updateProfile);
router.put("/user/status", updateOnlineStatus);
// example protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
