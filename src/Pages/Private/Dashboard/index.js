import React from "react";
import "./style.css";
import { Table } from "antd";
import RadialBarChart from "./RadialBarChart";
import PolarAreaChart from "./PolarAreaChart";
import AreaChart from "./AreaChart";

const Dashboard = () => {
  const dataStock = [
    {
      key: "1",
      stockName: "Oil & Gas Development Company",
      priceBought: 150,
      currentPrice: 160,
      expectedHighLow: "165/145",
      dayChange: "+4%",
      profitLoss: "+10",
    },
    {
      key: "2",
      stockName: "Habib Bank Limited",
      priceBought: 100,
      currentPrice: 95,
      expectedHighLow: "110/90",
      dayChange: "-5%",
      profitLoss: "-5",
    },
    {
      key: "3",
      stockName: "Lucky Cement",
      priceBought: 700,
      currentPrice: 710,
      expectedHighLow: "730/680",
      dayChange: "+1%",
      profitLoss: "+10",
    },
    {
      key: "4",
      stockName: "Fauji Fertilizer Company",
      priceBought: 180,
      currentPrice: 175,
      expectedHighLow: "190/170",
      dayChange: "-3%",
      profitLoss: "-5",
    },
    {
      key: "5",
      stockName: "Pakistan Telecommunication Company",
      priceBought: 30,
      currentPrice: 32,
      expectedHighLow: "35/28",
      dayChange: "+6%",
      profitLoss: "+2",
    },
    {
      key: "6",
      stockName: "United Bank Limited",
      priceBought: 120,
      currentPrice: 130,
      expectedHighLow: "135/115",
      dayChange: "+8%",
      profitLoss: "+10",
    },
    {
      key: "7",
      stockName: "Engro Corporation",
      priceBought: 250,
      currentPrice: 240,
      expectedHighLow: "260/230",
      dayChange: "-4%",
      profitLoss: "-10",
    },
    {
      key: "8",
      stockName: "Mughal Iron & Steel Industries",
      priceBought: 50,
      currentPrice: 52,
      expectedHighLow: "55/48",
      dayChange: "+4%",
      profitLoss: "+2",
    },
    {
      key: "9",
      stockName: "Sui Northern Gas Pipelines",
      priceBought: 50,
      currentPrice: 48,
      expectedHighLow: "55/45",
      dayChange: "-4%",
      profitLoss: "-2",
    },
    {
      key: "10",
      stockName: "Cement Company",
      priceBought: 900,
      currentPrice: 850,
      expectedHighLow: "950/800",
      dayChange: "-5%",
      profitLoss: "-50",
    },
  ];

  const columnsStock = [
    {
      title: "Stock Name",
      dataIndex: "stockName",
      key: "stockName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Price Bought",
      dataIndex: "priceBought",
      key: "priceBought",
      render: (text) => `Rs. ${text}`,
    },
    {
      title: "Current Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      render: (text) => `Rs. ${text}`,
    },
    {
      title: "Expected High/Low",
      dataIndex: "expectedHighLow",
      key: "expectedHighLow",
    },
    {
      title: "Day Change",
      dataIndex: "dayChange",
      key: "dayChange",
      render: (text) => (
        <span style={{ color: text.startsWith("+") ? "green" : "red" }}>
          {text.startsWith("+") ? `${text}` : text}
        </span>
      ),
    },
    {
      title: "Profit/Loss",
      dataIndex: "profitLoss",
      key: "profitLoss",
      render: (text) => (
        <span style={{ color: text.startsWith("+") ? "green" : "red" }}>
          {text.startsWith("+") ? `${text}` : text}
        </span>
      ),
    },
  ];

  const dataSuggestions = [
    {
      key: "1",
      stockName: "Oil & Gas Development Company",
      currentPrice: 160,
      volume: 1200000,
      suggestion: "Buy",
      riskPreference: "Medium",
    },
    {
      key: "2",
      stockName: "Habib Bank Limited",
      currentPrice: 95,
      volume: 800000,
      suggestion: "Sell",
      riskPreference: "Low",
    },
    {
      key: "3",
      stockName: "Lucky Cement",
      currentPrice: 710,
      volume: 500000,
      suggestion: "Buy",
      riskPreference: "High",
    },
    {
      key: "4",
      stockName: "Fauji Fertilizer Company",
      currentPrice: 175,
      volume: 600000,
      suggestion: "Sell",
      riskPreference: "Medium",
    },
    {
      key: "5",
      stockName: "Engro Corporation",
      currentPrice: 240,
      volume: 400000,
      suggestion: "Buy",
      riskPreference: "Low",
    },
  ];

  const columnsSuggestions = [
    {
      title: "Stock Name",
      dataIndex: "stockName",
      key: "stockName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Current Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      render: (text) => `Rs. ${text}`,
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      render: (text) => text.toLocaleString(), // Add commas to large numbers
    },
    {
      title: "Suggestion (Buy/Sell)",
      dataIndex: "suggestion",
      key: "suggestion",
      render: (text) => (
        <span style={{ color: text === "Buy" ? "green" : "red" }}>{text}</span>
      ),
    },
    {
      title: "Risk Preference",
      dataIndex: "riskPreference",
      key: "riskPreference",
      render: (text) => {
        let color = "";
        if (text === "High") color = "red";
        if (text === "Medium") color = "orange";
        if (text === "Low") color = "green";
        return <span style={{ color }}>{text}</span>;
      },
    },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Stock Account Dashboard</h1>

      <div className="section-inner">
        <div className="card">
          <h3 className="title">Invested Amount</h3>
          <div className="value">Rs. 150,000</div>
        </div>
        <div className="card">
          <h3 className="title">Current Stock Holding</h3>
          <div className="value positive">Rs. 890.50</div>
        </div>
        <div className="card">
          <h3 className="title">Profit/Loss</h3>
          <div className="value positive">3.8% Gain</div>
        </div>
        <div className="card">
          <h3 className="title">Day Change %</h3>
          <div className="value negative">-1.2%</div>
        </div>
      </div>

      <div className="section">
        <div className="area-chart">
          <AreaChart />
        </div>
      </div>

      <div className="charts-container">
        <div className="section">
          <RadialBarChart />
        </div>
        <div className="section">
          <PolarAreaChart />
        </div>
      </div>

      <div className="section">
        <h2>Stock Holdings</h2>
        <div className="table-container">
          <Table
            columns={columnsStock}
            dataSource={dataStock}
            pagination={false}
            bordered
          />
        </div>
      </div>

      <div className="section">
        <div className="table-container">
          <h2>Stock Suggestions</h2>
          <Table
            columns={columnsSuggestions}
            dataSource={dataSuggestions}
            pagination={false}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
