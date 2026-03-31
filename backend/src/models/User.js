import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  altPhone: {
    type: String,
    required: false,
    default: "",
  },
  role: {
    type: String,
    enum: ["Customer", "Shop Owner", "Delivery Partner"],
    default: "Customer",
  },
  isShopOwner: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
});

export default mongoose.model("User", userSchema);
