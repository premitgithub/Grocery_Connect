import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "../pages/Products/ProductsPage";
import ProductDetailPage from "../pages/Products/ProductDetailPage";
import CategoryProductsPage from "../pages/Products/CategoryProductsPage"; // 👈 new


const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path=":productName" element={<ProductDetailPage />} />
      <Route
        path="category/:categoryName"
        element={<CategoryProductsPage />}
      />{" "}
      {/* 👈 new */}
    </Routes>
  );
};

export default ProductRoutes;
