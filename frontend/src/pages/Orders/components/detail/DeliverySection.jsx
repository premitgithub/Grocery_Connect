import { FiMapPin, FiTruck } from "react-icons/fi";

/**
 * Shows the delivery address and the assigned delivery partner (if any).
 */
const DeliverySection = ({ deliveryAddress, deliveryPartner }) => (
  <section className="bg-teal-50/50 dark:bg-slate-800/40 border border-teal-100 dark:border-slate-700 p-6 rounded-3xl">
    <h3 className="text-lg font-bold text-teal-900 dark:text-teal-300 flex items-center gap-2 mb-4">
      <FiMapPin /> Delivery Address
    </h3>

    <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
      {deliveryAddress}
    </p>

    {deliveryPartner && (
      <div className="mt-6 pt-6 border-t border-teal-200/50 dark:border-slate-700 flex items-center gap-4">
        <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center text-xl shadow-sm shrink-0">
          <FiTruck />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-0.5">
            Delivery Partner
          </p>
          <p className="text-gray-900 dark:text-gray-100 font-bold text-lg">
            {deliveryPartner.name}
          </p>
        </div>
      </div>
    )}
  </section>
);

export default DeliverySection;
