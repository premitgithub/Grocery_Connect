import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${email}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-blac  k/50 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg w-[90%] sm:w-[400px] flex flex-col items-center"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Forgot Password
            </h2>
            <p className="text-gray-600 text-center mb-5 text-sm sm:text-base">
              Enter your registered email to receive a password reset link.
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-5">
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-emerald-500 placeholder-gray-400 text-sm sm:text-base"
              />

              <button
                type="submit"
                className="w-full p-3 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-3xl text-lg font-medium hover:opacity-90 transition duration-300 cursor-pointer"
              >
                Send Reset Link
              </button>
            </form>

            <button
              onClick={onClose}
              className="mt-5 text-sm text-emerald-700 hover:underline cursor-pointer"
            >
              Back to Login
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;
