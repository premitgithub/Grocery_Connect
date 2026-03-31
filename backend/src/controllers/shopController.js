import Shop from "../models/Shop.js";
import User from "../models/User.js";

// Create a new shop
export const createShop = async (req, res) => {
    try {
        const { name, description, address, image } = req.body;
        const owner = req.user.id; // Assuming auth middleware adds user to req

        // Check if user is a shop owner
        const user = await User.findById(owner);
        if (!user || !user.isShopOwner) {
            return res.status(403).json({ message: "Access denied. Not a shop owner." });
        }

        // Check if shop already exists for this owner
        const existingShop = await Shop.findOne({ owner });
        if (existingShop) {
            return res.status(400).json({ message: "Shop already exists for this user." });
        }

        const shop = new Shop({
            owner,
            name,
            description,
            address,
            image,
        });

        await shop.save();
        res.status(201).json(shop);
    } catch (error) {
        console.error("Error creating shop:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get shop by owner (for the logged-in shopkeeper)
export const getShopByOwner = async (req, res) => {
    try {
        const owner = req.user.id;
        const shop = await Shop.findOne({ owner });

        if (!shop) {
            return res.status(200).json(null);
        }

        res.status(200).json(shop);
    } catch (error) {
        console.error("Error fetching shop:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all shops
export const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find().populate("owner", "name email phoneNumber");
        res.status(200).json(shops);
    } catch (error) {
        console.error("Error fetching shops:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get shop by ID
export const getShopById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id).populate("owner", "name email phoneNumber");
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }
        res.status(200).json(shop);
    } catch (error) {
        console.error("Error fetching shop:", error);
        res.status(500).json({ message: "Server error" });
    }
};
