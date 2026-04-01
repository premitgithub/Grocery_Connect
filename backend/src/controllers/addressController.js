import Address from "../models/Address.js";

// Add a new address
export const addAddress = async (req, res) => {
    try {
        const { apartmentNo, floor, landmark, area, pincode } = req.body;
        const userId = req.user.id;

        if (!area || !pincode) {
            return res.status(400).json({ message: "Area and Pincode are required" });
        }

        const address = new Address({
            userId,
            apartmentNo,
            floor,
            landmark,
            area,
            pincode,
        });

        await address.save();
        res.status(201).json(address);
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ message: "Server error" });
    }
};



// Get all addresses for the logged-in user
export const getAddresses = async (req, res) => {
    try {
        const userId = req.user.id;
        const addresses = await Address.find({ userId });
        res.status(200).json(addresses);
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete an address
export const deleteAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        const userId = req.user.id;

        const address = await Address.findOneAndDelete({ _id: addressId, userId });

        if (!address) {
            return res.status(404).json({ message: "Address not found or not authorized" });
        }

        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        console.error("Error deleting address:", error);
        res.status(500).json({ message: "Server error" });
    }
};
