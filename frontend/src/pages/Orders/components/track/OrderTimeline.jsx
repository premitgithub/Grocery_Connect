import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle, FiMapPin, FiTruck,
  FiShoppingBag, FiPackage, FiHome,
} from "react-icons/fi";

const STEPS = [
  { key: "Pending",          label: "Order Placed",     icon: FiShoppingBag, desc: "Your order has been placed and is awaiting confirmation." },
  { key: "Accepted",         label: "Accepted",         icon: FiPackage,     desc: "A delivery partner has accepted your order." },
  { key: "Picked Up",        label: "Picked Up",        icon: FiTruck,       desc: "Your order has been picked up from the shop." },
  { key: "Out for Delivery", label: "Out for Delivery", icon: FiMapPin,      desc: "Your order is on the way! 🚀" },
  { key: "Delivered",        label: "Delivered",        icon: FiHome,        desc: "Order delivered successfully. Enjoy your groceries! 🎉" },
];

export const STATUS_ORDER = ["Pending", "Accepted", "Picked Up", "Out for Delivery", "Delivered"];

/**
 * Vertical animated stepper showing order progress.
 * Props:
 *   currentStatus – e.g. "Picked Up"
 */
const OrderTimeline = ({ currentStatus }) => {
  const currentStepIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <FiTruck className="text-teal-600 dark:text-teal-400" /> Order Progress
      </h2>

      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-gray-200 dark:bg-slate-700 z-0" />

        <div className="space-y-0">
          {STEPS.map((step, idx) => {
            const StepIcon  = step.icon;
            const isCurrent = idx === currentStepIndex;
            const isDone    = idx < currentStepIndex;

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="flex items-start gap-5 relative pb-8 last:pb-0"
              >
                {/* Status bubble */}
                <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-md transition-all duration-500 ${
                  isDone
                    ? "bg-teal-600 border-teal-600 text-white"
                    : isCurrent
                    ? "bg-white dark:bg-slate-800 border-teal-500 text-teal-600 dark:text-teal-400 ring-4 ring-teal-100 dark:ring-teal-900/40"
                    : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-400 dark:text-gray-500"
                }`}>
                  {isDone
                    ? <FiCheckCircle className="w-6 h-6" />
                    : <StepIcon className={`w-5 h-5 ${isCurrent ? "animate-pulse" : ""}`} />}
                </div>

                {/* Label + description */}
                <div className="pt-2.5 flex-1">
                  <p className={`font-bold text-base transition-colors ${
                    isDone    ? "text-teal-600 dark:text-teal-400"
                    : isCurrent ? "text-gray-900 dark:text-white"
                                : "text-gray-400 dark:text-gray-500"
                  }`}>
                    {step.label}
                    {isCurrent && (
                      <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-xs font-bold rounded-full border border-teal-200 dark:border-teal-800">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-ping inline-block" />
                        Current
                      </span>
                    )}
                  </p>

                  <AnimatePresence>
                    {(isDone || isCurrent) && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-gray-500 dark:text-gray-400 mt-0.5"
                      >
                        {step.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
