import React from "react";
import { motion } from "framer-motion";

const PaymentStatusStates = ({ isProcessing, paymentSuccess, paymentFailed, setPaymentFailed }) => {
  if (isProcessing) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-teal-600 border-t-white dark:border-t-slate-800 rounded-full animate-spin shadow-inner"></div>
        <p className="text-teal-700 dark:text-teal-300 font-bold text-lg animate-pulse">Processing payment securely...</p>
        <p className="text-sm text-gray-500">Please do not close or refresh.</p>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="py-14 flex flex-col items-center justify-center space-y-3">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl shadow-lg border-2 border-green-200">
          ✓
        </div>
        <p className="text-2xl font-bold text-green-700 dark:text-green-500">Payment Successful!</p>
        <p className="text-gray-500 text-sm">Redirecting...</p>
      </motion.div>
    );
  }

  if (paymentFailed) {
    return (
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="py-10 flex flex-col items-center justify-center space-y-3">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-4xl shadow-lg border-2 border-red-200">
          ✕
        </div>
        <p className="text-xl font-bold text-red-700 dark:text-red-500 text-center">Payment Failed!</p>
        <p className="text-gray-500 text-sm text-center px-4">The bank declined this transaction. Please try another method.</p>
        <button
          onClick={() => setPaymentFailed(false)}
          className="mt-4 px-8 py-3 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
        >
          Retry Payment
        </button>
      </motion.div>
    );
  }

  return null;
};

export default PaymentStatusStates;
