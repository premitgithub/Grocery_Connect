import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
    {
        owner: {
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
        description: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
            default: "https://via.placeholder.com/150",
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        balance: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Shop", shopSchema);
