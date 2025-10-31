// backend/src/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); 

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI not found in environment variables");
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ Database Connection Error:", err);
    process.exit(1);
  }
};

export default connectDB;
