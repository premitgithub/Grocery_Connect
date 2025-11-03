import Product from "../models/Product.js";

export const ProductListing = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Server error while fetching products" });
  }
};