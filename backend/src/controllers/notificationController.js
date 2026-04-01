import Notification from "../models/Notification.js";

// Fetch notifications for the authenticated user
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .limit(50); // limit to recent 50

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// Mark a specific notification as read
export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipient: userId },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification marked as read", notification });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Failed to mark as read" });
  }
};

// Optional: Mark all as read
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    await Notification.updateMany({ recipient: userId, read: false }, { read: true });

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark all as read" });
  }
};
