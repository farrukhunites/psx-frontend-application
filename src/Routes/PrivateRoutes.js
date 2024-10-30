import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Private/Dashboard";
import Portfolio from "../Pages/Private/Portfolio";
import UserSettings from "../Pages/Private/UserSettings";
import AddStock from "../Pages/Private/BuyStock";
import WatchlistAndAlerts from "../Pages/Private/WatchlistAndAlerts";
import StockNews from "../Pages/Private/StockNews";
import StockAnalysis from "../Pages/Private/StockAnalysis";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/buy-stock" element={<AddStock />} />
      <Route path="/stock-analysis" element={<StockAnalysis />} />
      <Route path="/settings" element={<UserSettings />} />
      <Route path="/watchlists&alerts" element={<WatchlistAndAlerts />} />
      <Route path="/stock-news" element={<StockNews />} />

      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default PrivateRoutes;
