import React from "react";
import { motion } from "framer-motion";

const ShopOwnerPopup = ({ onSelect }) => {
  const roles = [
    { title: "Customer", desc: "Shop and get groceries delivered", icon: "🛒" },
    { title: "Shop Owner", desc: "List your shop and sell products", icon: "🏪" },
    { title: "Delivery Partner", desc: "Deliver orders and earn money", icon: "🛵" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-sm w-[90%]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <h2 className="text-2xl font-bold text-teal-800 mb-2">
          Choose Your Role
        </h2>
        <p className="text-gray-500 mb-6 font-medium text-sm">
          Select how you want to use Grocery Connect
        </p>
        
        <div className="flex flex-col gap-4">
          {roles.map((role) => (
            <button
              key={role.title}
              onClick={() => onSelect(role.title)}
              className="flex items-center gap-4 p-4 border-2 border-transparent bg-gray-50 rounded-xl hover:bg-teal-50 hover:border-teal-500 transition-all duration-300 group cursor-pointer"
            >
              <div className="text-3xl bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                {role.icon}
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-teal-700">{role.title}</h3>
                <p className="text-gray-500 text-xs group-hover:text-teal-600/80">{role.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ShopOwnerPopup;
