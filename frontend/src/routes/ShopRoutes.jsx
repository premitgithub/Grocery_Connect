import React from "react";
import { Routes, Route } from "react-router-dom";
import ExploreShopsPage from "../pages/Shops/ExploreShopsPage";
import ShopDetailsPage from "../pages/Shops/ShopDetailsPage";


const ShopRoutes = () => {
  return (
    <Routes>
      <Route path="/shops" element={<ExploreShopsPage />} />
      <Route path="/shops/:id" element={<ShopDetailsPage />} />
    </Routes>
  );
};

export default ShopRoutes;
