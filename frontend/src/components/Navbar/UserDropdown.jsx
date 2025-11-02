import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMapPin,
  FiSettings,
  FiPower,
  FiGift,
  FiCreditCard,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import LogoutConfirmModal from "../Logout/LogoutConfirmModal";

const UserDropdown = ({ isOpen, onClose }) => {
  const dropdownRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // ✅ close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -15, x: 10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      x: 8,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  // ✅ helper for navigation
  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute mt-3 w-56 bg-white border cursor-pointer border-gray-200 shadow-[0_4px_18px_rgba(0,0,0,0.08)] 
                       rounded-xl py-2 z-50 origin-top-right right-1/2 translate-x-1/2 md:right-0 md:translate-x-0"
          >
            <button
              onClick={() => handleNavigate("/account/profile")}
              className="w-full flex text-lg items-center cursor-pointer gap-3 text-left px-6 py-3 hover:bg-emerald-50 hover:text-emerald-700 transition duration-300"
            >
              <FiUser className="text-teal-600 text-xl" />
              Profile
            </button>

            <button
              onClick={() => handleNavigate("/account/address")}
              className="w-full flex text-lg items-center gap-3 cursor-pointer text-left px-6 py-3 hover:bg-emerald-50 hover:text-emerald-700 transition duration-300"
            >
              <FiMapPin className="text-teal-600 text-xl" />
              Address
            </button>

            <button
              onClick={() => handleNavigate("/account/wallet")}
              className="w-full flex text-lg items-center gap-3 cursor-pointer text-left px-6 py-3 hover:bg-emerald-50 hover:text-emerald-700 transition duration-300"
            >
              <FiCreditCard className="text-teal-600 text-xl" />
              Wallet
            </button>

            <button
              onClick={() => handleNavigate("/account/gift-cards")}
              className="w-full flex text-lg items-center gap-3 cursor-pointer text-left px-6 py-3 hover:bg-emerald-50 hover:text-emerald-700 transition duration-300"
            >
              <FiGift className="text-teal-600 text-xl" />
              Gift Cards
            </button>

            <button
              onClick={() => handleNavigate("/account/e-card")}
              className="w-full flex text-lg items-center gap-3 cursor-pointer text-left px-6 py-3 hover:bg-emerald-50 hover:text-emerald-700 transition duration-300"
            >
              <FiCreditCard className="text-teal-600 text-xl" />
              E-Card
            </button>

            <button
              onClick={() => handleNavigate("/account/settings")}
              className="w-full flex text-lg items-center gap-3 text-left cursor-pointer px-6 py-3 hover:bg-emerald-50 hover:text-emerald-700 transition duration-300"
            >
              <FiSettings className="text-teal-600 text-xl" />
              Settings
            </button>

            <hr className="my-2 border-gray-200" />

            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full text-lg flex items-center justify-between cursor-pointer px-7 py-3 text-red-600 hover:bg-red-50 font-semibold transition-colors duration-300"
            >
              <span>Logout</span>
              <FiPower className="text-xl" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Logout Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default UserDropdown;
