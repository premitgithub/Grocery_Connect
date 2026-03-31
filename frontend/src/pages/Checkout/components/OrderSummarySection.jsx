import React from "react";
import { motion } from "framer-motion";

const OrderSummarySection = ({ cart, cartSubtotal, deliveryFee, totalAmount, onPlaceOrder, isPaymentValid }) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 sticky top-8"
    >
      <h3 className="text-2xl font-bold mb-6 dark:text-gray-100">Order Summary</h3>

      <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <img
                src={item.product?.image || "https://placehold.co/100"}
                alt={item.product?.name || "Product"}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="dark:text-gray-200">
                <p className="font-medium text-sm line-clamp-1">{item.product?.name || "Item"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.qty}</p>
              </div>
            </div>
            <p className="font-semibold dark:text-gray-200">₹{(item.product?.price || 0) * item.qty}</p>
          </div>
        ))}
      </div>

      <div className="border-t dark:border-slate-600 pt-4 space-y-3 dark:text-gray-300">
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span className="font-semibold">₹{cartSubtotal}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Delivery Fee</span>
          <span className="font-semibold">₹{deliveryFee}</span>
        </div>
      </div>

      <div className="border-t dark:border-slate-600 mt-4 pt-4 mb-8">
        <div className="flex justify-between text-2xl font-bold dark:text-teal-400 text-teal-700">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <button
        disabled={!isPaymentValid}
        className={`w-full cursor-pointer text-xl hover:bg-teal-800 duration-400 py-4 rounded-xl text-white font-bold tracking-wide shadow-lg hover:shadow-xl transition-all ${
          !isPaymentValid
            ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400 hover:shadow-lg"
            : "bg-teal-600 hover:bg-teal-800"
        }`}
        onClick={onPlaceOrder}
      >
        Place Order
      </button>
    </motion.aside>
  );
};

export default OrderSummarySection;
