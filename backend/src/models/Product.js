import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Vegetables",
        "Fruits",
        "Edible Oils",
        "Bakery",
        "Drinks",
        "Household"
      ]
    },
    images: [
      {
        type: String,
        required: true
      }
    ],
    stock: {
      type: Number,
      default: 0
    },
    brand: {
      type: String,
      trim: true
    },
    shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
