// src/routes/ProductRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "../pages/Products/ProductsPage";

const ProductRoutes = () => (
  <Routes>
    <Route path="/" element={<ProductsPage />} />
  </Routes>
);

export default ProductRoutes;
