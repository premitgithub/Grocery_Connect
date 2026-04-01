import jwt from "jsonwebtoken";
import User from "../models/User.js";

const otpStore = {}; // temporary in-memory store

// ✅ SEND OTP
export const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) return res.status(400).json({ message: "Phone number required" });

    // generate 6-digit otp
    const otp = Math.floor(100000 + Math.random() * 900000);

    // store otp with expiry
    otpStore[phoneNumber] = {
      otp,
      expiresAt: Date.now() + 2 * 60 * 1000, // 2 minutes expiry
    };

    console.log(`OTP for ${phoneNumber}: ${otp}`); // For testing, remove later

    return res.json({ message: "OTP sent successfully", otp });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    const record = otpStore[phoneNumber];
    if (!record)
      return res.status(400).json({ message: "No OTP found. Please resend." });

    if (Date.now() > record.expiresAt)
      return res.status(400).json({ message: "OTP expired. Please resend." });

    if (record.otp != otp)
      return res.status(400).json({ message: "Invalid OTP" });

    // ✅ Find or create user
    let user = await User.findOne({ phoneNumber });
    let isNewUser = false;
    if (!user) {
      user = await User.create({ phoneNumber, verified: true });
      isNewUser = true;
    } else {
      user.verified = true;
      await user.save();
    }

    delete otpStore[phoneNumber];

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" }
    );

    res.json({ message: "Login successful", token, user, isNewUser });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ SET USER ROLE
export const setUserRole = async (req, res) => {
  try {
    const { phoneNumber, role } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number required" });
    }

    const isShopOwner = role === "Shop Owner";

    const user = await User.findOneAndUpdate(
      { phoneNumber },
      { role, isShopOwner },
      { new: true } // return updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User role updated successfully", user });
  } catch (err) {
    console.error("Set Role Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ UPDATE USER PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { phoneNumber, name, email, altPhone } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number required" });
    }

    const user = await User.findOneAndUpdate(
      { phoneNumber },
      { name, email, altPhone },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ UPDATE ONLINE STATUS (For Delivery Partners)
export const updateOnlineStatus = async (req, res) => {
  try {
    const { userId, isOnline, location } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const updateData = { isOnline };
    if (location && location.lat && location.lng) {
      updateData.location = location;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Online status updated", user });
  } catch (err) {
    console.error("Update Status Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
