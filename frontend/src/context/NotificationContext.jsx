import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user && user._id) {
      // Fetch initial notifications
      const fetchNotifications = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) return;

          const res = await axios.get("http://localhost:5000/api/notifications", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setNotifications(res.data.notifications);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };

      fetchNotifications();

      // Establish Socket connection
      const newSocket = io("http://localhost:5000", {
        transports: ["websocket", "polling"],
      });

      newSocket.on("connect", () => {
        newSocket.emit("joinUserRoom", { userId: user._id });
      });

      newSocket.on("newNotification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        
        // Play notification sound
        try {
          const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
          audio.volume = 0.5;
          audio.play().catch(err => console.error("Audio playback blured or failed:", err));
        } catch(audioErr) {
          // Ignore
        }

        // Show hot toast based on type
        if (notification.type === "ORDER_PLACED") {
          toast.success(notification.message, { icon: "🎉", duration: 4000 });
        } else if (notification.type === "NEW_ORDER_RECEIVED") {
          toast.success(notification.message, { icon: "🛒", duration: 5000 });
        } else if (notification.type === "ORDER_PICKED_UP") {
          toast.success(notification.message, { icon: "🛵", duration: 5000 });
        } else {
          toast.info(notification.message);
        }
      });

      setSocket(newSocket);

      return () => {
        if (newSocket) newSocket.disconnect();
      };
    } else {
      setNotifications([]);
      if (socket) socket.disconnect();
    }
  }, [user]);

  // Update unread count whenever notifications change
  useEffect(() => {
    const unread = notifications.filter((n) => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/notifications/mark-all-read", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
