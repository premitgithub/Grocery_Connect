import React from "react";
import { motion } from "framer-motion";

const ShopOwnerPopup = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <motion.div
        className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-md w-[90%]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Are you a shop owner?
        </h2>
        <p className="text-gray-600 mb-6">
          Let us know so we can customize your experience.
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => onSelect(true)}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium cursor-pointer hover:bg-emerald-700 transition"
          >
            Yes
          </button>
          <button
            onClick={() => onSelect(false)}
            className="bg-gray-200 text-gray-800 px-6 py-2 cursor-pointer rounded-lg font-medium hover:bg-gray-300 transition"
          >
            No
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ShopOwnerPopup;
