import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import AccountRoutes from "./AccountRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/*" element={<AccountRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
