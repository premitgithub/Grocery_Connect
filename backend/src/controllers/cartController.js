import Cart from "../models/Cart.js";

// 🛒 Add item to cart
export const addToCart = async (req, res) => {
  try {
    console.log("Decoded user from JWT:", req.user);

    const userId = req.user._id; // from authMiddleware
    const { productId, quantity } = req.body;

    // Check if product is already in user's cart
    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      // If already exists, update quantity
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      // If not, create new cart item
      cartItem = await Cart.create({
        userId,
        productId,
        quantity: quantity || 1,
      });
    }

    res.status(200).json({ success: true, message: "Item added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding to cart", error });
  }
};

// 📦 Get all items in user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItems = await Cart.find({ userId }).populate("productId");
    res.status(200).json({ success: true, cartItems });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching cart", error });
  }
};

// ❌ Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    await Cart.findOneAndDelete({ userId, productId });
    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing item", error });
  }
};
