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
      <h2 className="text-3xl font-semibold text-teal-700 mb-6 border-b border-teal-200 pb-2">
        About
      </h2>
      <p className="text-gray-700 mb-8 leading-relaxed">
        {shop.shopDescription}
      </p>

      <div className="space-y-5 flex-grow">
        <div className="flex items-center gap-4 text-gray-700 text-lg">
          <MapPin size={22} className="text-teal-600" />
          <span className="font-medium">
            {shop.address.street ? `${shop.address.street}, ` : ""}
            {shop.address.area}, {shop.address.city} — {shop.address.pinCode}
          </span>
        </div>

        <div className="flex items-center gap-4 text-gray-700 text-lg">
          <Phone size={22} className="text-teal-600" />
          <span className="font-medium">{shop.phoneNumber}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-700 text-lg">
          <Clock size={22} className="text-teal-600" />
          <span className="font-medium">
            {shop.hours?.opening} — {shop.hours?.closing}
          </span>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between pt-6 border-t border-teal-200">
        <span
          className={`px-5 py-2 rounded-full text-lg font-semibold ${
            shop.shopStatus === "Open"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {shop.shopStatus}
        </span>

        <div className="text-right text-gray-600 text-sm space-y-1">
          <p>GST: {shop.gstNumber || "N/A"}</p>
          <p>Owner: {shop.ownerName || "-"}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopInfoSection;
