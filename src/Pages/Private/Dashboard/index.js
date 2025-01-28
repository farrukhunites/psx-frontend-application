import React, { useEffect, useState } from "react";
import "./style.css";
import { Table } from "antd";
import RadialBarChart from "./RadialBarChart";
import PolarAreaChart from "./PolarAreaChart";
import AreaChart from "./AreaChart";
import { getDashboard } from "../../../API/Dashboard";
import ClipLoader from "react-spinners/ClipLoader";

const Dashboard = ({ userData }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(data);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboard(userData?.id); // Fetch data using API function
        setData(data); // Update state with fetched data
      } catch (err) {
        console.log(err); // Set error if API call fails
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    if (userData?.id) {
      fetchDashboardData(); // Trigger API call
    }
  }, [userData]);

  const columnsStock = [
    {
      title: "Stock Info",
      dataIndex: "stock_name",
      key: "stock_info",
      render: (text, record) => (
        <div>
          <b>
            {text} ({record.symbol})
          </b>{" "}
        </div>
      ),
    },
    {
      title: "Price Bought",
      dataIndex: "price_bought",
      key: "price_bought",
      render: (text) => `Rs. ${text}`,
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
      key: "current_price",
      render: (text) => `Rs. ${text}`,
    },
    {
      title: "Expected High/Low",
      dataIndex: "expected",
      key: "expected",
    },
    {
      title: "Day Change",
      dataIndex: "day_change",
      key: "day_change",
      render: (text) => (
        <span style={{ color: text.startsWith("(-") ? "red" : "green" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Profit/Loss",
      dataIndex: "profit_loss",
      key: "profit_loss",
      render: (text) => (
        <span style={{ color: text > 0 ? "green" : "red" }}>{text}</span>
      ),
    },
  ];

  const columnsSuggestions = [
    {
      title: "Stock Name",
      dataIndex: "stock_name",
      key: "stockName",
      render: (text, record) => (
        <div>
          <b>
            {text} ({record.symbol})
          </b>{" "}
        </div>
      ),
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
      key: "currentPrice",
      render: (text) => `${text}`,
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
      dataIndex: "risk_preference",
      key: "riskPreference",
      render: (text) => {
        let color = "";
        if (text === "high") color = "red";
        if (text === "moderate") color = "orange";
        if (text === "low") color = "green";
        return (
          <span style={{ color, fontWeight: 600 }}>{text.toUpperCase()}</span>
        );
      },
    },
  ];

  if (loading) {
    <div className="loader">
      <ClipLoader color="#4A90E2" size={50} />
    </div>;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Stock Account Dashboard</h1>

      <div className="section-inner">
        <div className="card">
          <h3 className="title">Invested Amount</h3>
          <div className="value">Rs. {data?.invested_amount}</div>
        </div>
        <div className="card">
          <h3 className="title">Current Stock Holding</h3>
          <div className="value positive">
            Rs. {data?.current_stock_holding}
          </div>
        </div>
        <div className="card">
          <h3 className="title">Profit/Loss</h3>
          <div
            className={`value ${
              data?.profit_loss > 0 ? "positive" : "negative"
            }`}
          >
            {data?.profit_loss}% {data?.profit_loss > 0 ? "Gain" : "Loss"}
          </div>
        </div>
        <div className="card">
          <h3 className="title">Day Change %</h3>
          <div
            className={`value ${
              data?.day_change > 0 ? "positive" : "negative"
            }`}
          >
            {data?.day_change}%
          </div>
        </div>
      </div>

      <div className="section">
        <div className="area-chart">
          <AreaChart data={data?.portfolio_values} />
        </div>
      </div>

      <div className="charts-container">
        <div className="section">
          <RadialBarChart data={data?.stock_distribution_by_sector} />
        </div>
        <div className="section">
          <PolarAreaChart data={data?.stock_distribution_by_company} />
        </div>
      </div>

      <div className="section">
        <h2>Stock Holdings</h2>
        <div className="table-container">
          <Table
            columns={columnsStock}
            dataSource={data?.stock_holdings}
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
            dataSource={data?.stock_suggestions}
            pagination={false}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
