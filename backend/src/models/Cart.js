import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: Number,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

export default mongoose.model("Cart", cartSchema)