import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Private/Dashboard";
import Portfolio from "../Pages/Private/Portfolio";
import UserSettings from "../Pages/Private/UserSettings";
import AddStock from "../Pages/Private/BuyStock";
import WatchlistAndAlerts from "../Pages/Private/WatchlistAndAlerts";
import StockNews from "../Pages/Private/StockNews";
import StockAnalysis from "../Pages/Private/StockAnalysis";

const PrivateRoutes = ({ userData }) => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard userData={userData} />} />
      <Route path="/portfolio" element={<Portfolio userData={userData} />} />
      <Route path="/buy-stock" element={<AddStock userData={userData} />} />
      <Route path="/stock-analysis" element={<StockAnalysis />} />
      <Route path="/settings" element={<UserSettings userData={userData} />} />
      <Route
        path="/watchlists&alerts"
        element={<WatchlistAndAlerts userData={userData} />}
      />
      <Route path="/stock-news" element={<StockNews />} />

      <Route path="*" element={<Dashboard userData={userData} />} />
    </Routes>
  );
};

export default PrivateRoutes;
