import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShopCard = ({ shop }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl overflow-hidden shadow-2xl cursor-pointer 
      hover:scale-[1.05] transition-all duration-500 
      w-full sm:w-[26rem] h-[34rem] flex flex-col border border-gray-100 group"
    >
      {/* Top Image Section */}
      <div className="relative w-full h-44 overflow-hidden flex items-center justify-center bg-gray-50">
        <motion.img
          src={shop.shopImage}
          alt={shop.shopName}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Bottom Content */}
      <div className="flex flex-col flex-1 justify-between items-center text-center px-5 py-6 bg-white">
        <div>
          <h2 className="text-2xl font-bold text-teal-800 tracking-wide mb-1">
            {shop.shopName}
          </h2>
          <p className="text-gray-600 mt-2 text-lg mb-3 min-h-[3.5rem] line-clamp-2">
            {shop.shopDescription}
          </p>
        </div>

        {/* Shop Info */}
        <div className="text-gray-700 text-md space-y-2 mb-4">
          <p className="flex justify-center items-center gap-2">
            <MapPin size={18} className="text-teal-600" />
            <span className="font-medium">
              {shop.address.area}, {shop.address.city}
            </span>
          </p>
          <p className="flex justify-center items-center gap-2">
            <Phone size={18} className="text-teal-600" />
            <span className="font-medium">{shop.phoneNumber}</span>
          </p>
          <p className="flex justify-center items-center gap-2">
            <Clock size={18} className="text-teal-600" />
            <span className="font-medium">
              {shop.hours.opening} - {shop.hours.closing}
            </span>
          </p>
        </div>

        {/* Status + Button */}
        <div className="flex flex-col items-center gap-3 w-full">
          <span
            className={`px-4 py-1 rounded-2xl mb-4 text-lg font-semibold shadow-sm transition-all duration-300 ${
              shop.shopStatus === "Open"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {shop.shopStatus}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 bg-teal-600 text-white text-md font-semibold rounded-2xl shadow-md hover:bg-teal-700 cursor-pointer transition-all duration-300"
            onClick={() =>
              navigate(
                `/shops/${encodeURIComponent(
                  shop.id || shop._id || shop.shopName
                )}`
              )
            }
          >
            View Shop Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopCard;
