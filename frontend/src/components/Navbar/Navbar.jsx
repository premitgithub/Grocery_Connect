// import React, { useState } from "react";
// import { FaHome, FaBars, FaTimes } from "react-icons/fa";

// const Navbar = ({ onNavigate }) => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="w-full bg-white shadow-md px-8 py-5 flex items-center justify-between border-b border-zinc-300 relative">
//       {/* Logo */}
//       <div
//         className="flex items-center space-x-3 cursor-pointer"
//         onClick={onNavigate}
//       >
//         <FaHome className="text-2xl text-emerald-600" />
//         <span className="text-xl font-bold text-gray-900">Grocery Connect</span>
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex space-x-6 cursor-pointer text-gray-800 font-medium">
//         {["Home", "Products", "Orders", "Search", "Cart", "Login"].map(
//           (label) => (
//             <button
//               key={label}
//               onClick={onNavigate}
//               className="px-6 py-3 rounded-xl text-2xl cursor-pointer hover:bg-emerald-200 transition duration-500"
//             >
//               {label}
//             </button>
//           )
//         )}
//       </div>

//       {/* Hamburger Icon (Mobile) */}
//       <div
//         className="md:hidden text-3xl text-emerald-700 cursor-pointer"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         {menuOpen ? <FaTimes /> : <FaBars />}
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg flex flex-col items-center space-y-4 py-6 md:hidden animate-slideDown z-50">
//           {["Home", "Products", "Orders", "Search", "Cart", "Login"].map(
//             (label) => (
//               <button
//                 key={label}
//                 onClick={() => {
//                   onNavigate();
//                   setMenuOpen(false);
//                 }}
//                 className="text-gray-800 text-lg hover:text-emerald-700 cursor-pointer transition duration-300"
//               >
//                 {label}
//               </button>
//             )
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// src/components/Navbar/Navbar.jsx
// src/components/Navbar/Navbar.jsx
// src/components/Navbar/Navbar.jsx
import React, { useState, useContext } from "react";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { UserContext } from "../../context/UserContext";
import SearchBar from "./SearchBar"; // ✅ new import

const Navbar = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useContext(UserContext);

  const menuItems = [
    { label: "Products" },
    { label: "Orders" },
    {
      label: "Search",
      icon: <FiSearch className="text-teal-600 text-3xl" />,
      action: () => setShowSearch(true),
    },
    { label: "Cart", icon: <FiShoppingCart className="text-teal-600 text-3xl" /> },
  ];

  return (
    <nav className="w-full bg-white shadow-md px-8 py-5 flex items-center justify-between border-b border-zinc-300 relative">
      {/* Logo */}
      <div className="flex items-center space-x-3 cursor-pointer">
        <FaHome className="text-2xl text-emerald-600" />
        <span className="text-2xl font-bold text-gray-900">
          Grocery Connect
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 text-gray-800 font-medium">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="px-6 py-3 rounded-xl hover:bg-emerald-100 text-2xl cursor-pointer transition duration-500 flex items-center gap-2"
          >
            {item.icon && <span>{item.icon}</span>}
            {!item.icon && item.label}
          </button>
        ))}

        {/* Auth/User */}
        {user?.verified ? (
          <button
            title={user?.phone}
            className="flex items-center justify-center w-11 h-11 border-2 border-emerald-600 text-teal-600 rounded-full hover:bg-emerald-50 transition duration-500"
          >
            <FiUser className="text-3xl cursor-pointer" />
          </button>
        ) : (
          <button
            onClick={onLoginClick}
            className="px-5 py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 cursor-pointer text-2xl transition duration-500"
          >
            Login / Signup
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-2xl text-emerald-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-lg flex flex-col items-center space-y-4 py-4 z-40">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="flex items-center gap-3 text-2xl text-gray-800 hover:text-emerald-700 transition duration-300"
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          ))}
          {user?.verified ? (
            <button className="flex items-center gap-2 text-teal-700 font-semibold">
              <FiUser className="text-2xl" />
              Profile
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 text-2xl transition duration-500"
            >
              Login / Signup
            </button>
          )}
        </div>
      )}

      {/* Search Bar (Animated Overlay) */}
      <SearchBar isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </nav>
  );
};

export default Navbar;
