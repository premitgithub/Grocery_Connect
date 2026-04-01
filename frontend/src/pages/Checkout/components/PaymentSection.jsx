import React, { useEffect } from "react";
import { motion } from "framer-motion";

const PaymentSection = ({
  paymentMethod,
  setPaymentMethod,
  onValidityChange,
}) => {
  useEffect(() => {
    onValidityChange(!!paymentMethod);
  }, [paymentMethod, onValidityChange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300"
    >
      <h2 className="text-2xl font-bold mb-6 dark:text-gray-100">
        Payment Method
      </h2>
      <div className="space-y-4">
        {["COD", "UPI", "Card (Credit/Debit)"].map((method) => (
          <div key={method} className="border border-gray-200 dark:border-slate-600 rounded-xl overflow-hidden transition-colors">
            <label
              className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                paymentMethod === method
                  ? "bg-teal-50 dark:bg-teal-900/20"
                  : "hover:bg-gray-50 dark:hover:bg-slate-700/50"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="hidden"
              />
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentMethod === method
                    ? "border-teal-600"
                    : "border-gray-300 dark:border-slate-500"
                }`}
              >
                {paymentMethod === method && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 rounded-full bg-teal-600"
                  />
                )}
              </div>
              <span className="text-lg font-medium dark:text-gray-200">
                {method}
              </span>
            </label>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PaymentSection;
