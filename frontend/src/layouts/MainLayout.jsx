import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import PhoneAuthModal from "../components/Auth/PhoneAuthModal";
import { UserContext } from "../context/UserContext";
import AboutSection from "../components/HomePage/AboutSection";
import Footer from "../components/HomePage/Footer";

const MainLayout = () => {
  const { showLoginModal, setShowLoginModal } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 via-white to-emerald-50 flex flex-col">
      {/* Navbar already handles the Cart, etc. */}
      <Navbar onLoginClick={() => setShowLoginModal(true)} />

      {/* Main content area */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Login modal appears globally when triggered */}
      {showLoginModal && (
        <PhoneAuthModal onClose={() => setShowLoginModal(false)} />
      )}

      <AboutSection />
      <Footer />
    </div>
  );
};

export default MainLayout;
