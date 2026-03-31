import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPinIcon, UserIcon, BasketIcon } from "./Icons";
import DeliveryRouteMap from "./DeliveryRouteMap";

const DeliveryCard = ({ delivery, handleStatusUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Accepted": return "bg-teal-100 text-teal-800 border-teal-200";
      case "Picked Up": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delivered": return "bg-green-100 text-green-800 border-green-200";
      case "Rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getButtonStyle = (status) => {
    switch (status) {
      case "Pending": return "bg-green-600 hover:bg-green-700 text-white cursor-pointer";
      case "Accepted": return "bg-teal-600 hover:bg-teal-700 text-white cursor-pointer";
      case "Picked Up": return "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer";
      case "Delivered": return "bg-gray-300 text-gray-500 cursor-not-allowed";
      default: return "bg-gray-300 text-black";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5 lg:p-6 hover:shadow-md transition duration-300"
    >
      {/* Header: ID & Status */}
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-4 mb-4">
        <span className="font-bold text-gray-700 dark:text-gray-200">Order #{delivery._id.substring(18)}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(delivery.status)}`}>
          {delivery.status}
        </span>
      </div>

      {/* Tracking Flow */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
        <div className="flex-1 space-y-4 relative">
          {/* Vertical line connecting pickup and dropoff */}
          <div className="absolute left-2.5 top-8 bottom-8 w-0.5 bg-gray-200 dark:bg-slate-600 hidden md:block"></div>

          <div className="flex items-start space-x-4">
            <div className="bg-teal-50 dark:bg-slate-700 p-2 rounded-full relative z-10"><MapPinIcon /></div>
            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Pickup</p>
              <p className="font-bold text-gray-800 dark:text-gray-100">{delivery.shopName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{delivery.shopAddress}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 pt-2">
            <div className="bg-orange-50 dark:bg-slate-700 p-2 rounded-full relative z-10"><UserIcon /></div>
            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Dropoff</p>
              <p className="font-bold text-gray-800 dark:text-gray-100">{delivery.customerName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{delivery.deliveryAddress}</p>
            </div>
          </div>
        </div>

        {/* Order Summary Summary */}
        <div className="md:w-1/3 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 flex flex-col justify-center border border-transparent dark:border-slate-700">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 mb-2">
            <BasketIcon />
            <span className="font-semibold text-sm">Order Items</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{delivery.items?.length || 0} item(s)</p>
          <p className="font-bold text-lg text-teal-700 dark:text-teal-400">₹{delivery.totalAmount}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row justify-between pt-4 mt-2 border-t border-gray-100 dark:border-slate-700 gap-4">
        <div className="w-full md:w-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-6 py-3 rounded-xl font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition shadow-sm cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{isExpanded ? "Hide Map" : "📍 View Route"}</span>
          </button>
        </div>

        <div className="flex justify-end gap-3 w-full md:w-auto">
          {delivery.status === "Pending" && (
            <>
              <button
                onClick={() => handleStatusUpdate(delivery._id, "Rejected")}
                className="px-6 py-3 rounded-xl font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 transition shadow-sm cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={() => handleStatusUpdate(delivery._id, "Accepted")}
                className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold shadow-sm transition-all duration-300 transform active:scale-95 cursor-pointer ${getButtonStyle("Pending")}`}
              >
                Accept
              </button>
            </>
          )}

          {delivery.status === "Accepted" && (
            <button
              onClick={() => handleStatusUpdate(delivery._id, "Picked Up")}
              className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold shadow-sm transition-all duration-300 transform active:scale-95 cursor-pointer ${getButtonStyle("Accepted")}`}
            >
              Mark as Picked Up
            </button>
          )}

          {delivery.status === "Picked Up" && (
            <button
              onClick={() => handleStatusUpdate(delivery._id, "Delivered")}
              className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold shadow-sm transition-all duration-300 transform active:scale-95 cursor-pointer ${getButtonStyle("Picked Up")}`}
            >
              Mark as Delivered
            </button>
          )}

          {delivery.status === "Delivered" && (
            <button
              disabled
              className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold shadow-sm cursor-not-allowed ${getButtonStyle("Delivered")}`}
            >
              Completed 🎉
            </button>
          )}
        </div>
      </div>

      {/* Expandable Map Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <DeliveryRouteMap pickup={delivery.pickupLocation} drop={delivery.dropLocation} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DeliveryCard;
