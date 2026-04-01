import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AccountLayout from "../layouts/AccountLayout";
import ProfilePage from "../pages/Account/ProfilePage";
import AddressPage from "../pages/Account/AddressPage";
import WalletPage from "../pages/Account/WalletPage";
import GiftCardPage from "../pages/Account/GiftCardPage";
import ECardPage from "../pages/Account/ECardPage";
import SettingsPage from "../pages/Account/SettingsPage";

const AccountRoutes = () => {
  return (
    <Routes>
      <Route element={<AccountLayout />}>
        {/* Default redirect to /account/profile */}
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="address" element={<AddressPage />} />
        <Route path="wallet" element={<WalletPage />} />
        <Route path="gift-cards" element={<GiftCardPage />} />
        <Route path="e-card" element={<ECardPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default AccountRoutes;
