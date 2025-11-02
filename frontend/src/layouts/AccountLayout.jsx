// src/layouts/AccountLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AccountLayout = () => {
  const links = [
    { label: "Profile", path: "profile" },
    { label: "Address", path: "address" },
    { label: "Wallet", path: "wallet" },
    { label: "Gift Cards", path: "gift-cards" },
    { label: "E-Card", path: "e-card" },
    { label: "Settings", path: "settings" },
  ];

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
                  `w-full px-6 py-4 text-lg font-medium ${
                    isActive
                      ? "bg-teal-100 text-teal-700 border-r-4 border-teal-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
