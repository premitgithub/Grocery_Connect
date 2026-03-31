import Order from "../models/Order.js";
import User from "../models/User.js";

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

    // Auto-assignment if no deliveryPartnerId provided
    if (!orderData.deliveryPartnerId && orderData.pickupLocation && orderData.pickupLocation.lat) {
      const partners = await User.find({ role: "Delivery Partner", isOnline: true });
      let closestPartner = null;
      let minDistance = Infinity;

      for (const partner of partners) {
        if (partner.location && partner.location.lat) {
          const dist = getDistance(
            orderData.pickupLocation.lat, orderData.pickupLocation.lng,
            partner.location.lat, partner.location.lng
          );
          if (dist < minDistance) {
            minDistance = dist;
            closestPartner = partner;
          }
        }
      }

      if (closestPartner) {
        orderData.deliveryPartner = closestPartner._id;
      }
    } else if (orderData.deliveryPartnerId) {
      orderData.deliveryPartner = orderData.deliveryPartnerId;
    }

    const newOrder = await Order.create(orderData);
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

// Fetch orders natively mapping strictly to standard user object IDs
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

// Update order status (including rejection & reassignment)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, deliveryPartnerId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status === "Accepted") {
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
      if (!order.deliveryPartner || order.deliveryPartner.toString() !== deliveryPartnerId) {
        return res.status(403).json({ message: "Not your order" });
      }
      order.status = status;
    }

    await order.save();
    res.status(200).json({ message: `Order updated to ${status}`, order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};
