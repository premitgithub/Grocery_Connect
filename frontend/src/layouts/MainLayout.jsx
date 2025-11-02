// src/layouts/MainLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import PhoneAuthModal from "../components/Auth/PhoneAuthModal"; // 👈 if you use this

const MainLayout = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar now receives the same prop */}
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />

      <div className="flex-1">
        <Outlet />
      </div>

      {/* ✅ Keep the login modal here */}
      {isLoginOpen && <PhoneAuthModal onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
};

export default MainLayout;
