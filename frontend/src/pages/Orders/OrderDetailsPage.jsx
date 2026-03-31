import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

import { UserContext } from "../../context/UserContext";
import PageLoader   from "./components/shared/PageLoader";
import PageError    from "./components/shared/PageError";
import OrderDetailHeader from "./components/detail/OrderDetailHeader";
import OrderItemsList    from "./components/detail/OrderItemsList";
import DeliverySection   from "./components/detail/DeliverySection";
import PricingSummary    from "./components/detail/PricingSummary";
import OrderActions      from "./components/detail/OrderActions";

// ─── Page ─────────────────────────────────────────────────────────────────────
const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user, addToCart } = useContext(UserContext);

  const [order,       setOrder]       = useState(null);
  const [isLoading,   setIsLoading]   = useState(true);
  const [error,       setError]       = useState("");
  const [isReordering, setIsReordering] = useState(false);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setError("You must be logged in to view this order."); setIsLoading(false); return; }

        const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.order) setOrder(res.data.order);
        else setError("Order not found.");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load order details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.verified) fetchOrder();
    else setIsLoading(false);
  }, [orderId, user]);

  // ── Reorder ────────────────────────────────────────────────────────────────
  const handleReorder = async () => {
    if (!order?.items) return;
    setIsReordering(true);
    try {
      for (const item of order.items) {
        if (item.product?._id) await addToCart(item.product._id, item.quantity, false);
      }
      toast.success("Items added to cart 🛒");
      navigate("/cart");
    } catch {
      toast.error("Failed to reorder items");
    } finally {
      setIsReordering(false);
    }
  };

  // ── States ─────────────────────────────────────────────────────────────────
  if (isLoading) return <PageLoader message="Fetching order details..." />;
  if (error || !order) return <PageError message={error} />;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-teal-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-300/20 dark:bg-teal-700/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-300/20 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back button */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-semibold hover:text-teal-800 dark:hover:text-teal-300 transition-colors mb-6 group w-max"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Orders
        </button>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden"
        >
          {/* Header: ID + date + status badge */}
          <OrderDetailHeader order={order} />

          {/* Body grid */}
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: items + delivery address */}
            <div className="lg:col-span-2 space-y-8">
              <OrderItemsList items={order.items} />
              <DeliverySection
                deliveryAddress={order.deliveryAddress}
                deliveryPartner={order.deliveryPartner}
              />
            </div>

            {/* Right: pricing + actions */}
            <div className="lg:border-l border-gray-100 dark:border-slate-700 lg:pl-8 space-y-8 flex flex-col h-full">
              <PricingSummary
                items={order.items}
                totalAmount={order.totalAmount}
                paymentMode={order.paymentMode}
                paymentStatus={order.paymentStatus}
              />
              <OrderActions
                order={order}
                isReordering={isReordering}
                onReorder={handleReorder}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
