import jwt from "jsonwebtoken";
import User from "../models/User.js";

const otpStore = {}; // temporary in-memory store

// ✅ SEND OTP
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone required" });

    // generate 6-digit otp
    const otp = Math.floor(100000 + Math.random() * 900000);

    // store otp with expiry
    otpStore[phone] = {
      otp,
      expiresAt: Date.now() + 2 * 60 * 1000, // 2 minutes expiry
    };

    console.log(`OTP for ${phone}: ${otp}`); // For testing, remove later

    return res.json({ message: "OTP sent successfully" , otp});
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const record = otpStore[phone];
    if (!record)
      return res.status(400).json({ message: "No OTP found. Please resend." });

    if (Date.now() > record.expiresAt)
      return res.status(400).json({ message: "OTP expired. Please resend." });

    if (record.otp != otp)
      return res.status(400).json({ message: "Invalid OTP" });

    // ✅ Find or create user
    let user = await User.findOne({ phone });
    if (!user) user = await User.create({ phone, verified: true });

    delete otpStore[phone];

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" }
    );

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
