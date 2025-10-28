// import React from "react";
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

// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-teal-50">
//       <Navbar />
//       <HeroSection />
//       <ShopHighlights />
//       <CategoriesSection />
//       <TopProductsSection />
//       <HowItWorksSection />
//       <StatsSection />
//       <DownloadAppSection />
//       <TestimonialsSection />
//       <CTASection />
//       <AboutSection />
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;

import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function for navbar navigation
  const handleNavigateWithLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-teal-50">
      {/* Pass handler to Navbar */}
      <Navbar onNavigate={handleNavigateWithLoader} />
      <HeroSection />
      <ShopHighlights />
      <CategoriesSection />
      <TopProductsSection />
      <HowItWorksSection />
      <StatsSection />
      <DownloadAppSection />
      <TestimonialsSection />
      <CTASection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default HomePage;
