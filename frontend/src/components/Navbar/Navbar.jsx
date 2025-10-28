import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/login?loading=true");
  };

  return (
    <nav className="w-full bg-white shadow-md px-8 py-5 flex items-center justify-between border-b border-zinc-300">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={handleNavigation}
      >
        <FaHome className="text-2xl text-emerald-600" />
        <span className="text-xl font-bold text-gray-900">Grocery Connect</span>
      </div>

      <div className="flex space-x-6 text-gray-800 font-medium cursor-pointer">
        {["Home", "Products", "Orders", "Search", "Cart", "Login"].map(
          (label) => (
            <button
              key={label}
              onClick={handleNavigation}
              className="px-7 py-4 rounded-2xl text-2xl hover:bg-emerald-200 transition duration-700 cursor-pointer"
            >
              {label}
            </button>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
