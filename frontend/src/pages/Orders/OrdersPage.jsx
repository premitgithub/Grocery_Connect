import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { FiBox } from "react-icons/fi";
import OrderCard from "./components/OrderCard";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/orders/customer", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedOrders = res.data.orders || [];
        const sortedOrders = fetchedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Failed to load historical orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.verified) {
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  // Handle unauthenticated states organically
  if (!user?.verified && !isLoading) {
    return (
      <div className="min-h-screen bg-teal-50 dark:bg-slate-900 flex items-center justify-center p-6 transition-colors">
        <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Login Required</h2>
          <p className="text-gray-500 dark:text-slate-400 mb-6">Please sign in to view your historical orders securely.</p>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-teal-50 dark:bg-slate-900 py-12 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight flex items-center gap-3">
          <FiBox className="text-teal-600" /> My Orders
        </h1>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-teal-700 dark:text-teal-300 font-semibold animate-pulse">Loading secure ledger...</p>
          </div>
        ) : orders.length === 0 ? (
          // Elegant Empty State
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center shadow-lg border border-gray-100 dark:border-slate-700 w-full flex flex-col items-center">
            <div className="w-24 h-24 bg-teal-50 dark:bg-slate-700 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner">
              🛒
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">No orders yet</h2>
            <p className="text-gray-500 dark:text-slate-400 max-w-md mb-8">
              Looks like your ledger is totally clean! Let's get you some fresh groceries and fill this back up!
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg hover:bg-teal-700 hover:shadow-xl active:scale-95 transition-all text-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          // Dynamic Order Cards Mapping
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <OrderCard key={order._id} order={order} idx={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
