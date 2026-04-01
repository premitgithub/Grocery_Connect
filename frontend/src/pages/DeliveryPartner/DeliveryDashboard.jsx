import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DeliveryHeader from "./components/DeliveryHeader";
import DeliveryCard from "./components/DeliveryCard";

const DeliveryDashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [user?._id]);

  const fetchOrders = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/orders/delivery?deliveryPartnerId=${user._id}`);
      if (res.ok) {
        const data = await res.json();
        setDeliveries(data.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong loading orders");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({});
    navigate("/");
    toast.success("Logged out successfully");
  };

  const toggleOnlineStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    
    // Always sync status; if coming online, grab location
    if (newStatus && navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
         async (position) => {
           const lat = position.coords.latitude;
           const lng = position.coords.longitude;
           await updateBackendStatus(newStatus, { lat, lng });
         },
         async (error) => {
           // We silently fall back to Mumbai coordinates instead of printing the messy GeolocationPositionError
           const fallbackLocation = { lat: 19.0760, lng: 72.8777 };
           await updateBackendStatus(newStatus, fallbackLocation);
           toast.success("Online! Using fallback location since GPS is disabled.");
         }
       );
    } else {
       updateBackendStatus(newStatus, null);
    }
  };

  const updateBackendStatus = async (status, location) => {
    if (!user?._id) return;
    try {
      const payload = { userId: user._id, isOnline: status };
      if (location) payload.location = location;

      const res = await fetch("http://localhost:5000/api/user/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        toast.warning("Warning: Failed to sync status with server.");
      }
    } catch (error) {
       console.error("Backend Sync Error:", error);
    }
  };

  const handleStatusUpdate = async (id, nextStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus, deliveryPartnerId: user._id })
      });

      if (res.ok) {
        toast.success(`Order marked as ${nextStatus}!`);
        fetchOrders();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      <DeliveryHeader 
        isOnline={isOnline} 
        toggleOnlineStatus={toggleOnlineStatus} 
        handleLogout={handleLogout} 
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Hi, {user?.name || "Partner"}! 👋</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Here are your assigned deliveries for today.</p>
          </div>
          <button
            onClick={fetchOrders}
            className="cursor-pointer text-teal-600 hover:text-teal-800 flex items-center bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg font-semibold transition"
          >
            ↻ Refresh
          </button>
        </div>

        {/* Deliveries Grid */}
        {loading ? (
          <div className="text-center text-gray-500 py-10 font-semibold text-lg">Loading orders...</div>
        ) : deliveries.length === 0 ? (
          <div className="text-center text-gray-500 py-10 font-semibold text-lg">No orders available right now.</div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {deliveries.map((delivery) => (
                <DeliveryCard 
                  key={delivery._id} 
                  delivery={delivery} 
                  handleStatusUpdate={handleStatusUpdate} 
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeliveryDashboard;
