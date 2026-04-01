import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBox, FiClock, FiCreditCard, FiCheckCircle } from "react-icons/fi";

const OrderCard = ({ order, idx }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
      case "Pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "Cancelled":
      case "Rejected":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
      case "Picked Up":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      case "Accepted":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const previewItems = order.items.slice(0, 3);
  const remainingItemsCount = order.items.length - previewItems.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: idx * 0.1 }}
      whileHover={{ scale: 1.015 }}
      onClick={() => navigate(`/orders/${order._id}`)}
      className="bg-white dark:bg-slate-800 rounded-3xl shadow-md hover:shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden transition-all duration-300 flex flex-col md:flex-row cursor-pointer group/card"
    >
      <div className="flex-1 p-6 sm:p-8 flex flex-col relative">
        {/* Header: ID, Date & Top-Right Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                Order
              </span>
              <span className="font-mono text-gray-900 dark:text-white text-lg font-extrabold tracking-tight group-hover/card:text-teal-600 dark:group-hover/card:text-teal-400 transition-colors">
                #{order._id.slice(-8).toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FiClock className="text-teal-500" />{" "}
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div
            className={`px-4 py-2 rounded-full border text-sm font-bold shadow-sm hover:shadow-md transition-shadow flex items-center gap-2 ${getStatusColor(
              order.status
            )}`}
          >
            {order.status === "Delivered" ? <FiCheckCircle /> : <FiBox />}{" "}
            {order.status}
          </div>
        </div>

        {/* Content Area: Items & Financials side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2 flex-grow">
          {/* Items Preview */}
          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <FiBox /> Order Summary
            </h4>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-800/80 dark:to-slate-800/40 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/50 space-y-4 flex-grow shadow-sm">
              {previewItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="relative shrink-0">
                    <img
                      src={
                        item.product?.image ||
                        "https://placehold.co/100x100?text=Item"
                      }
                      alt={item.product?.name || "Product"}
                      className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-200 dark:border-slate-600 group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm border-2 border-white dark:border-slate-800">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 dark:text-gray-200 font-semibold truncate group-hover:text-teal-600 transition-colors">
                      {item.product?.name || "Unknown Item"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      ₹{item.product?.price || 0} each
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-gray-900 dark:text-white font-bold">
                      ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              {remainingItemsCount > 0 && (
                <div className="pt-3 mt-3 border-t border-dashed border-gray-200 dark:border-slate-600/60">
                  <p className="text-sm text-teal-600 dark:text-teal-400 font-bold hover:text-teal-700 dark:hover:text-teal-300 transition-colors flex items-center gap-1 cursor-pointer">
                    <span>+</span> {remainingItemsCount} more item
                    {remainingItemsCount > 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment & Amount Info */}
          <div className="flex flex-col h-full justify-between">
            <div className="mb-4"></div>
            <div className="bg-gradient-to-tr from-teal-50 to-teal-100/50 dark:from-teal-900/20 dark:to-teal-900/10 p-5 rounded-2xl border border-teal-100 dark:border-teal-800/30 shadow-sm relative overflow-hidden group">
              {/* Decorative blur circle */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-teal-200/40 dark:bg-teal-700/20 rounded-full blur-xl group-hover:bg-teal-300/40 transition-colors duration-500"></div>

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <span className="text-sm font-bold text-teal-800 dark:text-teal-300 uppercase tracking-widest flex items-center gap-2 mb-1">
                    <FiCreditCard /> Payment
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 font-medium ml-6">
                    {order.paymentMode}
                  </p>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-extrabold shadow-sm border ${
                    order.paymentStatus?.includes("Success")
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-yellow-100 text-yellow-700 border-yellow-200"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>

              <div className="flex justify-between items-end border-t border-teal-200/60 dark:border-teal-800/50 pt-4 relative z-10">
                <span className="text-base font-bold text-gray-700 dark:text-gray-300">
                  Total Amount
                </span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800 dark:from-teal-400 dark:to-teal-200 truncate pl-2">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Sidebar */}
      <div className="bg-gray-50/50 dark:bg-slate-800/30 md:w-56 p-6 sm:p-8 flex flex-row md:flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 dark:border-slate-700 backdrop-blur-sm relative z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/orders/${order._id}`);
          }}
          className="group flex-1 md:flex-none w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white text-sm font-extrabold rounded-2xl shadow-lg shadow-teal-600/30 hover:shadow-teal-600/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2"
        >
          View Details
        </button>
        {(order.status === "Pending" ||
          order.status === "Accepted" ||
          order.status === "Picked Up" ||
          order.status === "Out for Delivery") && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/track/${order._id}`);
            }}
            className="group flex-1 md:flex-none w-full py-3.5 px-4 bg-white dark:bg-slate-700 hover:bg-teal-50 dark:hover:bg-slate-600 text-teal-700 dark:text-teal-300 border-2 border-teal-100 dark:border-slate-600 hover:border-teal-300 text-sm font-extrabold rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2"
          >
            Track Order
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default OrderCard;
