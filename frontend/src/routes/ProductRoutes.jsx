// // src/routes/ProductRoutes.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import ProductsPage from "../pages/Products/ProductsPage";

// const ProductRoutes = () => (
//   <Routes>
//     <Route path="/" element={<ProductsPage />} />
//   </Routes>
// );

// export default ProductRoutes;

// src/routes/ProductRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "../pages/Products/ProductsPage";
import ProductDetailPage from "../pages/Products/ProductDetailPage";

const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path=":productName" element={<ProductDetailPage />} />
    </Routes>
  );
};

export default ProductRoutes;
