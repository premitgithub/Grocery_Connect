import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["ORDER_PLACED", "NEW_ORDER_RECEIVED", "ORDER_PICKED_UP", "ORDER_DELIVERED"],
    },
    message: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object, // Can store { orderId, itemsSummary, customerAddress }
      default: {},
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", notificationSchema);
