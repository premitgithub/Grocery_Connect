import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        apartmentNo: {
            type: String,
            trim: true,
        },
        floor: {
            type: String,
            trim: true,
        },
        landmark: {
            type: String,
            trim: true,
        },
        area: {
            type: String,
            required: true,
            trim: true,
        },
        pincode: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Address", addressSchema);
