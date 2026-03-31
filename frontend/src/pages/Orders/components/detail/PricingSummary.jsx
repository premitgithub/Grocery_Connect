import { FiCreditCard } from "react-icons/fi";

/**
 * Right-side pricing card: subtotal, delivery fee, total, payment method + status.
 */
const PricingSummary = ({ items, totalAmount, paymentMode, paymentStatus }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);
  const deliveryFee = totalAmount > subtotal ? totalAmount - subtotal : 0;

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-800/50 p-6 rounded-3xl border border-gray-100 dark:border-slate-700/50 shadow-sm flex-grow">
      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <FiCreditCard /> Payment Summary
      </h3>

      {/* Line items */}
      <div className="space-y-3 mb-6 font-medium text-gray-600 dark:text-gray-300 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold text-gray-900 dark:text-gray-100">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-bold text-gray-900 dark:text-gray-100">₹{deliveryFee.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-dashed border-gray-200 dark:border-slate-600 pt-4 mb-6">
        <div className="flex justify-between items-end text-lg">
          <span className="font-bold text-gray-800 dark:text-gray-200">Total Amount</span>
          <span className="text-3xl font-black text-teal-600 dark:text-teal-400 tracking-tight">
            ₹{totalAmount}
          </span>
        </div>
      </div>

      {/* Payment details */}
      <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl border border-teal-100 dark:border-teal-800/30">
        <p className="text-sm font-semibold text-teal-800 dark:text-teal-300 flex justify-between items-center mb-1">
          <span>Method</span>
          <span className="uppercase">{paymentMode || "COD"}</span>
        </p>
        <p className="text-sm font-semibold text-teal-800 dark:text-teal-300 flex justify-between items-center">
          <span>Status</span>
          <span className={`px-2 py-0.5 rounded shadow-sm text-xs border ${
            paymentStatus?.includes("Success")
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-yellow-100 text-yellow-700 border-yellow-200"
          }`}>
            {paymentStatus || "Pending"}
          </span>
        </p>
      </div>
    </section>
  );
};

export default PricingSummary;
