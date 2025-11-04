// // src/pages/Products/ProductDetailPage.jsx
// import React from "react";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import ProductImageSection from "../../components/Products/ProductImageSection";
// import ProductInfoSection from "../../components/Products/ProductInfoSection";
// import ProductExtraInfo from "../../components/Products/ProductExtraInfo";

// const ProductDetailPage = () => {
//   const { productName } = useParams();

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gradient-to-r from-teal-50 via-white to-emerald-50 py-10 px-4"
//     >
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* Left - Image */}
//         <ProductImageSection productName={productName} />

//         {/* Right - Info */}
//         <ProductInfoSection productName={productName} />
//       </div>

//       {/* Bottom Section */}
//       <motion.div
//         initial={{ y: 30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//         className="mt-16"
//       >
//         <ProductExtraInfo />
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ProductDetailPage;

import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useProductDetail } from "../../hooks/useProductDetail";
import ProductImageSection from "../../components/Products/ProductImageSection";
import ProductInfoSection from "../../components/Products/ProductInfoSection";
import ProductExtraInfo from "../../components/Products/ProductExtraInfo";
import AboutSection from "../../components/HomePage/AboutSection";
import Footer from "../../components/HomePage/Footer";

const ProductDetailPage = () => {
  const { productName } = useParams();
  const { product, loading, error } = useProductDetail(productName);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="animate-pulse text-gray-500 text-lg"
        >
          Loading product details...
        </motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 text-lg">
        {error || "Product not found"}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-r from-teal-50 via-white to-emerald-50 py-10 px-4"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left - Image */}
        <ProductImageSection product={product} />

        {/* Right - Info */}
        <ProductInfoSection product={product} />
      </div>

      {/* Bottom Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-16"
      >
        <ProductExtraInfo product={product} />
      </motion.div>
    </motion.div>
  );
};

export default ProductDetailPage;
