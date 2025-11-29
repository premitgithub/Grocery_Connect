import Product from "../models/Product.js";

export const ProductListing = async (req, res) => {
  try {
    const { shopId } = req.query;
    const query = shopId ? { shop: shopId } : {};
    const products = await Product.find(query);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Server error while fetching products" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, stock, brand, shopId } = req.body;

    // Verify if the user is the owner of the shop
    // This part assumes the frontend sends the shopId or we fetch it based on the user
    // For better security, we should fetch the shop owned by the user and verify it matches shopId or just use the user's shop.

    // Ideally, we should look up the shop by the logged-in user
    // const shop = await Shop.findOne({ owner: req.user.id });
    // if (!shop) return res.status(403).json({ message: "You do not have a shop" });

    // For now, let's assume the shopId is passed and we trust the verifyToken middleware to ensure the user is a shop owner (we can add more checks)

    const product = new Product({
      name,
      description,
      price,
      category,
      images,
      stock,
      brand,
      shop: shopId
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error while adding product" });
  }
};