// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import Navbar from "../components/Navbar/Navbar";
// import HeroSection from "../components/HomePage/HeroSection";
// import ShopHighlights from "../components/HomePage/ShopHighlights";
// import CategoriesSection from "../components/HomePage/CategoriesSection";
// import TopProductsSection from "../components/HomePage/TopProductsSection";
// import HowItWorksSection from "../components/HomePage/HowItWorksSection";
// import StatsSection from "../components/HomePage/StatsSection";
// import DownloadAppSection from "../components/HomePage/DownloadAppSection";
// import TestimonialsSection from "../components/HomePage/TestimonialsSection";
// import CTASection from "../components/HomePage/CTASection";
// import AboutSection from "../components/HomePage/AboutSection";
// import Footer from "../components/HomePage/Footer";
// import LoginModal from "../components/LoginModal/LoginModal";
// import Loader from "../components/PageLoader/Loader";
// import ShopOwnerPopup from "../components/ShopOwnerPopup/ShopOwnerPopup";

// const HomePage = () => {
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showOwnerPopup, setShowOwnerPopup] = useState(false);
//   const [isShopOwner, setIsShopOwner] = useState(null);
//   const navigate = useNavigate();

//   const handleLoginSuccess = () => {
//     setIsLoginOpen(false);

//     // show popup instead of directly loading
//     setTimeout(() => {
//       setShowOwnerPopup(true);
//     }, 400);
//   };

//   const handleOwnerSelection = (isOwner) => {
//     setShowOwnerPopup(false);
//     setIsShopOwner(isOwner);

//     // then show loader and navigate
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       navigate("/"); // homepage reload
//     }, 1500);
//   };

//   return (
//     <div className="relative min-h-screen bg-teal-50 overflow-hidden">
//       <motion.div
//         className={`transition-all duration-500 ${
//           isLoading
//             ? "blur-md opacity-40 pointer-events-none"
//             : "blur-none opacity-100"
//         }`}
//       >
//         <Navbar onNavigate={() => setIsLoginOpen(true)} />
//         <HeroSection />
//         <ShopHighlights />
//         <CategoriesSection />
//         <TopProductsSection />
//         <HowItWorksSection />
//         <StatsSection />
//         <DownloadAppSection />
//         <TestimonialsSection />
//         {/* 👇 Show CTASection only if user is a shop owner */}
//         {isShopOwner && <CTASection />}
//         <AboutSection />
//         <Footer />
//       </motion.div>

//       <AnimatePresence>
//         {isLoading && (
//           <motion.div
//             className="fixed inset-0 bg-white/50 backdrop-blur-md z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <Loader />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence mode="wait">
//         {isLoginOpen && (
//           <LoginModal
//             onClose={() => setIsLoginOpen(false)}
//             onLoginSuccess={handleLoginSuccess}
//           />
//         )}
//       </AnimatePresence>

//       {/* 👇 Shop owner popup */}
//       <AnimatePresence>
//         {showOwnerPopup && <ShopOwnerPopup onSelect={handleOwnerSelection} />}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default HomePage;

// src/pages/HomePage.jsx
import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/HomePage/HeroSection";
import ShopHighlights from "../components/HomePage/ShopHighlights";
import CategoriesSection from "../components/HomePage/CategoriesSection";
import TopProductsSection from "../components/HomePage/TopProductsSection";
import HowItWorksSection from "../components/HomePage/HowItWorksSection";
import StatsSection from "../components/HomePage/StatsSection";
import DownloadAppSection from "../components/HomePage/DownloadAppSection";
import TestimonialsSection from "../components/HomePage/TestimonialsSection";
import CTASection from "../components/HomePage/CTASection";
import AboutSection from "../components/HomePage/AboutSection";
import Footer from "../components/HomePage/Footer";

import Loader from "../components/PageLoader/Loader";
import { PhoneAuthModal } from "../components/Auth";
import { UserContext } from "../context/UserContext";

const HomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLoginSuccess = () => {
    // Close modal first
    setIsLoginOpen(false);

    // Simulate loader before redirect
    setTimeout(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/"); // redirect to homepage again
      }, 1500);
    }, 300);
  };

  return (
    <div className="relative min-h-screen bg-teal-50 overflow-hidden">
      {/* ✅ Main Content */}
      <motion.div
        className={`transition-all duration-500 ${
          isLoading
            ? "blur-md opacity-40 pointer-events-none"
            : "blur-none opacity-100"
        }`}
      >
        {/* <Navbar onLoginClick={() => setIsLoginOpen(true)} /> */}
        <HeroSection />
        <ShopHighlights />
        <CategoriesSection />
        <TopProductsSection />
        <HowItWorksSection />
        <StatsSection />
        <DownloadAppSection />
        <TestimonialsSection />

        {/* ✅ Conditionally show CTA only if shop owner */}
        {user?.isShopOwner && <CTASection />}

        <AboutSection />
        <Footer />
      </motion.div>

      {/* ✅ Loader Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-white/60 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Login / Signup Popup */}
      <AnimatePresence mode="wait">
        {isLoginOpen && (
          <PhoneAuthModal
            onClose={() => {
              setIsLoginOpen(false);
              handleLoginSuccess();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
