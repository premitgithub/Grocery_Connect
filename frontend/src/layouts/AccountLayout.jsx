import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AccountLayout = () => {
  const location = useLocation();

  const links = [
    { label: "Profile", path: "/account/profile" },
    { label: "Address", path: "/account/address" },
    { label: "Wallet", path: "/account/wallet" },
    { label: "Gift Cards", path: "/account/gift-cards" },
    { label: "E-Card", path: "/account/e-card" },
    { label: "Settings", path: "/account/settings" },
  ];

  // ✅ Fade + slide transition, tuned for no double flash
  const fadeVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <div className="flex justify-center py-12 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
        {/* Sidebar */}
        <aside className="md:w-1/4 w-full border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
          <nav className="flex md:flex-col justify-around md:justify-start">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative w-full px-6 py-4 text-lg font-medium transition-all duration-300 ease-in-out ${
                    isActive
                      ? "bg-teal-100 text-teal-700 border-r-4 border-teal-600 shadow-inner"
                      : "text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                  }`
                }
              >
                {link.label}
                {/* Optional teal indicator bar */}
                {({ isActive }) =>
                  isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 w-1 h-full bg-teal-600 rounded-r"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )
                }
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Content with fade transition */}
        <main className="flex-1 p-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              className="min-h-[400px]"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
