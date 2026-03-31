import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "./src/models/Order.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/grocerydb";

const seedOrders = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB connected...");

    // Clear existing orders
    await Order.deleteMany();
    console.log("🧹 Old orders removed.");

    // Generate valid random ObjectIds for shop, customer, and products
    const dummyShopId = new mongoose.Types.ObjectId();
    const dummyCustomerId1 = new mongoose.Types.ObjectId();
    const dummyCustomerId2 = new mongoose.Types.ObjectId();
    const dummyCustomerId3 = new mongoose.Types.ObjectId();
    const dummyProductId1 = new mongoose.Types.ObjectId();
    const dummyProductId2 = new mongoose.Types.ObjectId();

    const orders = [
      {
        shop: dummyShopId,
        customer: dummyCustomerId1,
        items: [
          { product: dummyProductId1, quantity: 2 },
          { product: dummyProductId2, quantity: 1 }
        ],
        totalAmount: 340,
        status: "Pending",
        deliveryAddress: "Apt 4B, Sunrise Towers, Block 3",
        customerName: "Rahul Sharma",
        shopName: "Fresh Mart",
        shopAddress: "12/A MK Road, Downtown",
        pickupLocation: { lat: 19.0760, lng: 72.8777 },
        dropLocation: { lat: 19.0820, lng: 72.8800 }
      },
      {
        shop: dummyShopId,
        customer: dummyCustomerId2,
        items: [
          { product: dummyProductId2, quantity: 5 },
        ],
        totalAmount: 650,
        status: "Pending",
        deliveryAddress: "Villa 12, Palm Meadows",
        customerName: "Priya Desai",
        shopName: "Green Valley Groceries",
        shopAddress: "Sector 4 Market",
        pickupLocation: { lat: 19.0760, lng: 72.8777 },
        dropLocation: { lat: 19.0700, lng: 72.8900 }
      },
      {
        shop: dummyShopId,
        customer: dummyCustomerId3,
        items: [
          { product: dummyProductId1, quantity: 3 }
        ],
        totalAmount: 280,
        status: "Pending",
        deliveryAddress: "Flat 201, River View Apts",
        customerName: "Amit Kumar",
        shopName: "Daily Needs",
        shopAddress: "Central Plaza",
        pickupLocation: { lat: 19.0760, lng: 72.8777 },
        dropLocation: { lat: 19.0900, lng: 72.8700 }
      }
    ];

    await Order.insertMany(orders);
    console.log(`✅ Inserted ${orders.length} mock orders successfully!`);

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedOrders();
