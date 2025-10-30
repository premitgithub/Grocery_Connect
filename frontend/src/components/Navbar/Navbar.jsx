import React, { useState } from "react";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md px-8 py-5 flex items-center justify-between border-b border-zinc-300 relative">
      {/* Logo */}
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={onNavigate}
      >
        <FaHome className="text-2xl text-emerald-600" />
        <span className="text-xl font-bold text-gray-900">Grocery Connect</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 cursor-pointer text-gray-800 font-medium">
        {["Home", "Products", "Orders", "Search", "Cart", "Login"].map(
          (label) => (
            <button
              key={label}
              onClick={onNavigate}
              className="px-6 py-3 rounded-xl text-2xl cursor-pointer hover:bg-emerald-200 transition duration-500"
            >
              {label}
            </button>
          )
        )}
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div
        className="md:hidden text-3xl text-emerald-700 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg flex flex-col items-center space-y-4 py-6 md:hidden animate-slideDown z-50">
          {["Home", "Products", "Orders", "Search", "Cart", "Login"].map(
            (label) => (
              <button
                key={label}
                onClick={() => {
                  onNavigate();
                  setMenuOpen(false);
                }}
                className="text-gray-800 text-lg hover:text-emerald-700 cursor-pointer transition duration-300"
              >
                {label}
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
