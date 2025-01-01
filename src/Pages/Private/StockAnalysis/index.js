import React from "react";
import "./style.css";
import RealTimeChart from "./Realtime";

const StockAnalysis = () => {
  return (
    <div className="stock-analysis">
      <div className="section">
        <h2 className="accordion-title">Real Time Stock Value</h2>
        <RealTimeChart />
      </div>
    </div>
  );
};

export default StockAnalysis;
