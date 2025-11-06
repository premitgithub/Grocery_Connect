import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import AccountRoutes from "./AccountRoutes";
import ProductRoutes from "./ProductRoutes";
import CartPage from "../pages/Cart/CartPage";
import ShopRoutes from "./ShopRoutes";
import SearchResultsPage from "../pages/SearchResultsPage";



const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/*" element={<AccountRoutes />} />
        <Route path="/products/*" element={<ProductRoutes />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/*" element={<ShopRoutes />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
