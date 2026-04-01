import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Initially unassigned
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Under Review", "Pending", "Accepted", "Picked Up", "Out for Delivery", "Delivered", "Rejected"],
      default: "Under Review",
    },
    rejectedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    deliveryAddress: {
      type: String,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["COD", "UPI", "Card (Credit/Debit)"],
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed", "Success (Simulated)", "Paid"],
      default: "Pending",
    },
    // Adding denormalized names to avoid excessive populations for UI simplicity
    customerName: {
      type: String,
      default: "Customer",
    },
    shopName: {
      type: String,
      default: "Shop",
    },
    shopAddress: {
      type: String,
      default: "",
    },
    pickupLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    dropLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
