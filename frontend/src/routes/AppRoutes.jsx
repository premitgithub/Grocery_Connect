import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import AccountRoutes from "./AccountRoutes";
import ProductRoutes from "./ProductRoutes";
import CartPage from "../pages/Cart/CartPage";
import ShopRoutes from "./ShopRoutes";
import SearchResultsPage from "../pages/SearchResultsPage";
import AddProductPage from "../pages/Shopkeeper/AddProductPage";
import ShopDashboard from "../pages/Shopkeeper/ShopDashboard";
import DeliveryDashboard from "../pages/DeliveryPartner/DeliveryDashboard";
import CheckoutRoutes from "./CheckoutRoutes";
import OrdersPage from "../pages/Orders/OrdersPage";
import OrderDetailsPage from "../pages/Orders/OrderDetailsPage";
import TrackOrderPage from "../pages/Orders/TrackOrderPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/*" element={<AccountRoutes />} />
        <Route path="/products/*" element={<ProductRoutes />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout/*" element={<CheckoutRoutes />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
        <Route path="/track/:orderId" element={<TrackOrderPage />} />
        <Route path="/*" element={<ShopRoutes />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/shop/add-product" element={<AddProductPage />} />
        <Route path="/shop-dashboard" element={<ShopDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
