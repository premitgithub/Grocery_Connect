import mongoose from "mongoose";

const deliveryPartnerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      required: false,
    },
    isOnline: {
      type: Boolean,
      default: false, // Default availability status is offline
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DeliveryPartner", deliveryPartnerSchema);
