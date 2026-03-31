import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCartItems = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const cartProducts = await Cart.find({ userId: phoneNumber }).populate("productId");
        return res.status(200).json(cartProducts);

    } catch (error) {
        console.error("Error fetching products from Cart:", error);
        return res.status(500).json({ message: "Server error while fetching products from Cart" });
    }
}

export const addCartItems = async (req, res) => {
    try {
        const { productId, phoneNumber, quantity = 1 } = req.body;
        const cartProduct = await Cart.findOne({ productId, userId: phoneNumber });

        if (cartProduct) {
            cartProduct.quantity += Number(quantity);
            await cartProduct.save();

            return res.json({
                success: true,
                message: "Quantity Increased",
                cartProduct
            })
        }

        const newItem = await Cart.create({
            userId: phoneNumber,
            productId: productId,
            quantity: Number(quantity)
        })

        return res.json({
            success: true,
            message: "Product added to cart",
            newItem
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error while adding item to cart." });
    }
}

export const reduceCartItems = async (req, res) => {
    try {

        const { productId, phoneNumber } = req.body;
        const cartProduct = await Cart.findOne({ productId, userId: phoneNumber });

        if (!cartProduct) {
            return res.json({
                success: false,
                message: "No such item in the cart."
            });
        }
        if (cartProduct.quantity === 1) {
            await Cart.deleteOne({ productId: productId, userId: phoneNumber });

            return res.json({
                success: true,
                message: "Item has been removed from the cart."
            });
        }

        cartProduct.quantity -= 1;
        await cartProduct.save();


        return res.json({
            success: true,
            message: "Quantity decreased",
            data: cartProduct
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while reducing item"
        });
    }
}

export const removeCartItems = async (req, res) => {
    try {
        console.log(req.body);
        const { phoneNumber, productId } = req.body;

        console.log(productId);
        console.log(phoneNumber);

        const cartProduct = await Cart.findOne({ productId, userId: phoneNumber });

        if (!cartProduct) {
            return res.json({
                success: false,
                message: "No such product exists."
            });
        }

        await Cart.deleteOne({ productId: productId, userId: phoneNumber });

        return res.json({
            success: true,
            message: "Item has been removed from the cart."
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while removing item"
        });
    }
}

export const clearCartItems = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        const product = await Cart.findOne({
            userId: phoneNumber
        })

        if (!product) {
            return res.json({
                success: false,
                message: "No such Item to delete"
            });
        };

        await Cart.deleteMany({
            userId: phoneNumber
        })

        return res.json({
            success: true,
            message: "Successfullt cleared the cart."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while clearing cart item"
        });
    }
}