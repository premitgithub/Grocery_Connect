import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

const ShopInfoSection = ({ shop }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col h-full"
    >
      <h2 className="text-3xl font-semibold text-teal-700 dark:text-teal-300 mb-6 border-b border-teal-200 dark:border-teal-800 pb-2">
        About
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        {shop.description || "No description available."}
      </p>

      <div className="space-y-5 flex-grow">
        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 text-lg">
          <MapPin size={22} className="text-teal-600 dark:text-teal-400" />
          <span className="font-medium">
            {shop.address || "Address unavailable"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 text-lg">
          <Phone size={22} className="text-teal-600 dark:text-teal-400" />
          <span className="font-medium">{shop.owner?.phoneNumber || "No phone"}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 text-lg">
          <Clock size={22} className="text-teal-600 dark:text-teal-400" />
          <span className="font-medium">
            {shop.isOpen ? "Open" : "Closed"}
          </span>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between pt-6 border-t border-teal-200 dark:border-teal-800">
        <span
          className={`px-5 py-2 rounded-full text-lg font-semibold ${shop.isOpen
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }`}
        >
          {shop.isOpen ? "Open" : "Closed"}
        </span>

        <div className="text-right text-gray-600 dark:text-gray-400 text-sm space-y-1">
          <p>Owner: {shop.owner?.name || "-"}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopInfoSection;
