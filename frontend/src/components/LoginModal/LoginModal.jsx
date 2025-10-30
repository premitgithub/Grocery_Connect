import React from "react";
import { motion } from "framer-motion";
import { AuthWrapper } from "../../components/Auth";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Overlay - click to close */}
      <motion.div
        className="absolute inset-0"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      ></motion.div>

      {/* Modal content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 50 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* ✅ Directly render AuthWrapper instead of LoginPage */}
        <AuthWrapper onLoginSuccess={onLoginSuccess} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-6 text-gray-600 hover:text-emerald-700 text-3xl font-bold transition-transform hover:scale-125 cursor-pointer"
        >
          ×
        </button>
      </motion.div>
    </div>
  );
};

export default LoginModal;

