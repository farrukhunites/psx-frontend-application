import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Private/Dashboard";
import Portfolio from "../Pages/Private/Portfolio";
import StockDetails from "../Pages/Private/StockDetails";
import UserSettings from "../Pages/Private/UserSettings";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/stock-details" element={<StockDetails />} />
      <Route path="/settings" element={<UserSettings />} />

      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default PrivateRoutes;
