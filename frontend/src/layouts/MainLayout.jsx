// src/layouts/MainLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import PhoneAuthModal from "../components/Auth/PhoneAuthModal";

const MainLayout = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 via-white to-emerald-50 flex flex-col">
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />

      <div className="flex-1">
        <Outlet />
      </div>

      {isLoginOpen && <PhoneAuthModal onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
};

export default MainLayout;
