import Order from "../models/Order.js";
import User from "../models/User.js";
import Shop from "../models/Shop.js";
import Notification from "../models/Notification.js";
import { geocodeAddress } from "../utils/geocoder.js";

// Helper function: Haversine distance in km
const getDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// Create new order with auto-assignment
export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // Ensure customer can place only one active order at a time
    if (orderData.customer) {
      const activeStates = ["Under Review", "Pending", "Accepted", "Picked Up", "Out for Delivery"];
      const existingActiveOrder = await Order.findOne({
        customer: orderData.customer,
        status: { $in: activeStates }
      });

      if (existingActiveOrder) {
        return res.status(400).json({
          message: "You already have an active order. Please complete it before placing a new one."
        });
      }
    }

    // Populate denormalized names and plausible GPS coords
    const customer = await User.findById(orderData.customer);
    const shop = await Shop.findById(orderData.shop);

    if (customer) {
      orderData.customerName = customer.name || "Customer";
    }
    if (shop) {
      orderData.shopName = shop.name || "Shop";
      orderData.shopAddress = shop.address || "Shop Address";
    }

    // Geocode strictly based on the actual physical addresses defined
    // Both OpenStreetMap calls might take 1s each, await sequentially or concurrently
    try {
      const [shopCoords, dropCoords] = await Promise.all([
        geocodeAddress(orderData.shopAddress),
        geocodeAddress(orderData.deliveryAddress)
      ]);

      if (shopCoords) {
        orderData.pickupLocation = shopCoords;
      } else {
        // Graceful fallback coordinate for development
        orderData.pickupLocation = {
          lat: 19.0760 + (Math.random() * 0.04 - 0.02),
          lng: 72.8777 + (Math.random() * 0.04 - 0.02)
        };
      }

      if (dropCoords) {
        orderData.dropLocation = dropCoords;
      } else {
        orderData.dropLocation = {
          lat: 19.0760 + (Math.random() * 0.04 - 0.02),
          lng: 72.8777 + (Math.random() * 0.04 - 0.02)
        };
      }
    } catch (geocodingSoftErr) {
      console.error("Geocoding failed gracefully:", geocodingSoftErr);
      orderData.pickupLocation = { lat: 19.0760, lng: 72.8777 };
      orderData.dropLocation = { lat: 19.0760, lng: 72.8777 };
    }

    const newOrder = await Order.create(orderData);

    // Provide context-rich details to the shop owner
    let itemsSummary = `${newOrder.items.length} items`;
    try {
      // Find shop to notify the owner and possibly assign balance
      const shop = await Shop.findById(newOrder.shop);
      if (shop) {
        // Assign payment to shop owner if Paid online
        if (newOrder.paymentStatus === "Paid") {
          shop.balance += newOrder.totalAmount;
          await shop.save();
        }
        // Shop Owner Notification
        const shopNotification = await Notification.create({
          recipient: shop.owner,
          type: "NEW_ORDER_RECEIVED",
          message: "New order received 🛒",
          metadata: {
            orderId: newOrder._id,
            itemsSummary,
            customerAddress: newOrder.deliveryAddress,
          },
        });

        // Customer Notification
        const customerNotification = await Notification.create({
          recipient: newOrder.customer,
          type: "ORDER_PLACED",
          message: "Your order has been placed successfully 🎉",
          metadata: {
            orderId: newOrder._id,
          },
        });

        // Emit via Socket.io
        const io = req.app.get("io");
        if (io) {
          io.to(`user_${shop.owner}`).emit("newNotification", shopNotification);
          io.to(`user_${newOrder.customer}`).emit("newNotification", customerNotification);
        }
      }
    } catch (notifErr) {
      console.error("Failed to generate notifications:", notifErr);
    }

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// Fetch delivery orders
export const getDeliveryOrders = async (req, res) => {
  try {
    const { deliveryPartnerId } = req.query;

    if (!deliveryPartnerId) {
      return res.status(400).json({ message: "deliveryPartnerId is required" });
    }

    const orders = await Order.find({
      $or: [
        { status: "Pending", deliveryPartner: { $exists: false } }, // Unassigned
        { status: "Pending", deliveryPartner: null }, // Unassigned
        { deliveryPartner: deliveryPartnerId } // Assigned specifically to this DP
      ],
      rejectedBy: { $ne: deliveryPartnerId } // Cannot see orders they rejected
    }).sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching delivery orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Fetch shop orders for the Shop Owner dashboard
export const getShopOrders = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const shop = await Shop.findOne({ owner: ownerId });
    if (!shop) return res.status(404).json({ message: "Shop not found for this user" });

    const orders = await Order.find({ shop: shop._id })
      .populate({ path: "items.product", select: "name price defaultImage imageUrl category" })
      .populate("customer", "name phoneNumber")
      .populate("deliveryPartner", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching shop orders:", error);
    res.status(500).json({ message: "Failed to fetch shop orders" });
  }
};

// Fetch personal orders strictly mapping to standard user object IDs
export const getCustomerOrders = async (req, res) => {
  try {
    const customerId = req.user.id;
    if (!customerId) {
      return res.status(401).json({ message: "Unauthorized token" });
    }

    const orders = await Order.find({ customer: customerId })
      .populate({ path: "items.product", select: "name price defaultImage imageUrl" })
      .populate("shop", "shopName name") // Safely fetching Shop name if generic mapping is needed
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).json({ message: "Failed to fetch personal orders" });
  }
};

// Fetch full details of a specific order
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized token" });

    const order = await Order.findById(orderId)
      .populate({ path: "items.product", select: "name price defaultImage imageUrl category desc" })
      .populate("shop", "shopName name location")
      .populate("deliveryPartner", "name phone location vehicleDetails avatar");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only allow customer, assigned partner, or shop to view it
    const isCustomer = order.customer && order.customer.toString() === userId;
    const isDeliveryPartner = order.deliveryPartner && order.deliveryPartner._id && order.deliveryPartner._id.toString() === userId;
    const isShop = order.shop && order.shop._id && order.shop._id.toString() === userId;

    if (!isCustomer && !isDeliveryPartner && !isShop) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ message: "Failed to fetch order details", error: error.message });
  }
};

// Update order status (including rejection & reassignment)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, deliveryPartnerId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status === "Pending" && order.status === "Under Review") {
      // Auto-assignment triggered only when Shop Owner accepts the order
      order.status = "Pending";
      if (!order.deliveryPartner && order.pickupLocation && order.pickupLocation.lat) {
        const partners = await User.find({ role: "Delivery Partner", isOnline: true });
        let closestPartner = null;
        let minDistance = Infinity;

        for (const partner of partners) {
          if (partner.location && partner.location.lat) {
            const dist = getDistance(
              order.pickupLocation.lat, order.pickupLocation.lng,
              partner.location.lat, partner.location.lng
            );
            if (dist < minDistance) {
              minDistance = dist;
              closestPartner = partner;
            }
          }
        }
        if (closestPartner) {
          order.deliveryPartner = closestPartner._id;
        }
      }
    } else if (status === "Accepted") {
      if (order.status !== "Pending") {
        return res.status(400).json({ message: "Order no longer available" });
      }
      order.deliveryPartner = deliveryPartnerId;
      order.status = status;
    } else if (status === "Rejected") {
      if (order.deliveryPartner && order.deliveryPartner.toString() !== deliveryPartnerId) {
        return res.status(403).json({ message: "Not your order" });
      }

      // Auto-reassignment logic
      if (!order.rejectedBy.includes(deliveryPartnerId)) {
        order.rejectedBy.push(deliveryPartnerId);
      }
      order.deliveryPartner = null;
      order.status = "Pending";

      // Try finding the next available partner
      if (order.pickupLocation && order.pickupLocation.lat) {
        const partners = await User.find({
          role: "Delivery Partner",
          isOnline: true,
          _id: { $nin: order.rejectedBy }
        });

        let closestPartner = null;
        let minDistance = Infinity;
        for (const partner of partners) {
          if (partner.location && partner.location.lat) {
            const dist = getDistance(
              order.pickupLocation.lat, order.pickupLocation.lng,
              partner.location.lat, partner.location.lng
            );
            if (dist < minDistance) {
              minDistance = dist;
              closestPartner = partner;
            }
          }
        }

        if (closestPartner) {
          order.deliveryPartner = closestPartner._id;
        }
      }
    } else {
      // For any other status change initiated by Delivery Partner (e.g., Picked Up, Delivered)
      if (!order.deliveryPartner || order.deliveryPartner.toString() !== deliveryPartnerId) {
        return res.status(403).json({ message: "Not your order" });
      }

      if (status === "Delivered") {
        if (order.paymentMode === "COD") {
          order.paymentStatus = "Paid";
        }
      }

      order.status = status;
    }

    await order.save();

    // Feature Extension: Picked Up Notification
    if (status === "Picked Up" && order.customer) {
      try {
        const customerNotification = await Notification.create({
          recipient: order.customer,
          type: "ORDER_PICKED_UP",
          message: "Your order has been picked up & is on the way! 🛵",
          metadata: { orderId: order._id }
        });
        const io = req.app.get("io");
        if (io) {
          io.to(`user_${order.customer}`).emit("newNotification", customerNotification);
        }
      } catch (err) {
        console.error("Failed to set picked up notification:", err);
      }
    }

    if (status === "Delivered" && order.customer) {
      try {
        const io = req.app.get("io");

        // Customer Notification
        const customerEvent = await Notification.create({
          recipient: order.customer,
          type: "ORDER_DELIVERED",
          message: "Your order has been delivered successfully ✅",
          metadata: { orderId: order._id }
        });
        if (io) io.to(`user_${order.customer}`).emit("newNotification", customerEvent);

        // Shop Notification
        const shop = await Shop.findById(order.shop);
        if (shop && shop.owner) {
          const shopEvent = await Notification.create({
            recipient: shop.owner,
            type: "ORDER_DELIVERED",
            message: "Order delivered successfully 📦",
            metadata: { orderId: order._id }
          });
          if (io) io.to(`user_${shop.owner}`).emit("newNotification", shopEvent);
        }
      } catch (err) {
        console.error("Failed to set delivered notification:", err);
      }
    }

    res.status(200).json({ message: `Order updated to ${status}`, order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};
