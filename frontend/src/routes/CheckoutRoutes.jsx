import React from "react";
import { Routes, Route } from "react-router-dom";
import CheckoutPage from "../pages/Checkout/CheckoutPage";

const CheckoutRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CheckoutPage />} />
    </Routes>
  );
};

export default CheckoutRoutes;
