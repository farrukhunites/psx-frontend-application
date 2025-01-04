import React, { useState } from "react";
import "./style.css";
import {
  Button,
  Collapse,
  Form,
  InputNumber,
  Popconfirm,
  Radio,
  Table,
} from "antd";
import { useNavigate } from "react-router-dom";
import RiskAnalysis from "./RiskAnalysis";

const { Panel } = Collapse;

const Portfolio = () => {
  const [form] = Form.useForm();
  const [quantityToSell, setQuantityToSell] = useState(1);
  const [sellingPrice, setSellingPrice] = useState(0);

  const navigate = useNavigate();

  const userData = {
    name: "Muhammad Farrukh Umair",
    email: "haris.umair2002@gmail.com",
    username: "farrukh.umair",
    cdcId: "CDC-12345",
    totalPortfolioValue: "1,500,000",
    investedAmount: "1,200,000",
    profitLoss: {
      value: "+300,000",
      percentage: "+25%",
    },
    dayChange: "-1.2%",
    riskLevel: "medium",
  };

  const stocks = [
    {
      name: "Oil & Gas Development Company",
      currentPrice: "Rs. 160",
      priceBought: "Rs. 180",
      quantity: 100,
      investedAmount: "Rs. 15000",
      profitLoss: {
        value: "+3000",
        percentage: "+20%",
      },
      riskLevel: "medium",
    },
    {
      name: "Habib Bank Limited",
      currentPrice: "Rs. 95",
      priceBought: "Rs. 180",
      quantity: 200,
      investedAmount: "Rs. 19000",
      profitLoss: {
        value: "-950",
        percentage: "-5%",
      },
      riskLevel: "high",
    },
    {
      name: "Lucky Cement",
      currentPrice: "Rs. 710",
      priceBought: "Rs. 180",
      quantity: 50,
      investedAmount: "Rs. 35000",
      profitLoss: {
        value: "+350",
        percentage: "+1%",
      },
      riskLevel: "low",
    },
    {
      name: "United Bank Limited",
      currentPrice: "Rs. 130",
      priceBought: "Rs. 180",
      quantity: 150,
      investedAmount: "Rs. 19500",
      profitLoss: {
        value: "+1560",
        percentage: "+8%",
      },
      riskLevel: "medium",
    },
    {
      name: "Fauji Fertilizer Company",
      currentPrice: "Rs. 175",
      priceBought: "Rs. 180",
      quantity: 120,
      investedAmount: "Rs. 21000",
      profitLoss: {
        value: "-630",
        percentage: "-3%",
      },
      riskLevel: "low",
    },
    {
      name: "Pakistan Petroleum Limited",
      currentPrice: "Rs. 190",
      priceBought: "Rs. 180",
      quantity: 80,
      investedAmount: "Rs. 15200",
      profitLoss: {
        value: "+304",
        percentage: "+2%",
      },
      riskLevel: "medium",
    },
    {
      name: "Engro Corporation",
      currentPrice: "Rs. 240",
      priceBought: "Rs. 180",
      quantity: 90,
      investedAmount: "Rs. 21600",
      profitLoss: {
        value: "-864",
        percentage: "-4%",
      },
      riskLevel: "high",
    },
    {
      name: "Sui Northern Gas Pipelines",
      currentPrice: "Rs. 48",
      priceBought: "Rs. 180",
      quantity: 250,
      investedAmount: "Rs. 12000",
      profitLoss: {
        value: "-480",
        percentage: "-4%",
      },
      riskLevel: "low",
    },
    {
      name: "Dawood Hercules Corporation",
      currentPrice: "Rs. 150",
      priceBought: "Rs. 180",
      quantity: 130,
      investedAmount: "Rs. 19500",
      profitLoss: {
        value: "+1170",
        percentage: "+6%",
      },
      riskLevel: "medium",
    },
    {
      name: "Bank Alfalah",
      currentPrice: "Rs. 75",
      priceBought: "Rs. 180",
      quantity: 180,
      investedAmount: "Rs. 13500",
      profitLoss: {
        value: "+405",
        percentage: "+3%",
      },
      riskLevel: "high",
    },
    {
      name: "National Bank of Pakistan",
      currentPrice: "Rs. 85",
      priceBought: "Rs. 180",
      quantity: 220,
      investedAmount: "Rs. 18700",
      profitLoss: {
        value: "-374",
        percentage: "-2%",
      },
      riskLevel: "medium",
    },
  ];

  const handleSellStock = ({ data }) => {
    console.log(data);
  };

  const handleBuyStock = () => {
    navigate("/buy-stock");
  };
  const confirmSell = (stock, sellingPrice, quantityToSell) => {
    form
      .validateFields()
      .then((values) => {
        handleSellStock(stock, quantityToSell, sellingPrice);
      })
      .catch((info) => {
        console.log("Validation failed:", info);
      });
  };

  const sortedStocks = stocks.sort(
    (a, b) =>
      parseFloat(b.profitLoss.percentage) - parseFloat(a.profitLoss.percentage)
  );

  const topPerformers = sortedStocks.slice(0, 5);
  const worstPerformers = sortedStocks.slice(-5).reverse();

  const stockColumns = [
    {
      title: "Stock Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Current Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Invested Amount",
      dataIndex: "investedAmount",
      key: "investedAmount",
    },
    {
      title: "Profit/Loss",
      dataIndex: "profitLoss",
      key: "profitLoss",
      render: (profitLoss) => (
        <span
          style={{ color: profitLoss.value.startsWith("+") ? "green" : "red" }}
        >
          Rs. {profitLoss.value} ({profitLoss.percentage})
        </span>
      ),
    },
  ];

  const transactionColumns = [
    {
      title: "Date of Transaction",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Type of Transaction",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Asset/Ticker",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Number of Shares/Units",
      dataIndex: "shares",
      key: "shares",
    },
    {
      title: "Price per Share/Unit (Rs.)",
      dataIndex: "pricePerShare",
      key: "pricePerShare",
      render: (pricePerShare) => `Rs. ${pricePerShare}`,
    },
    {
      title: "Total Transaction Amount (Rs.)",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => `Rs. ${totalAmount}`,
    },
  ];

  const transactions = [
    {
      key: "1",
      date: "2024-10-01",
      type: "Buy",
      asset: "OGDC",
      shares: 100,
      pricePerShare: 160,
      totalAmount: 16000,
    },
    {
      key: "2",
      date: "2024-09-25",
      type: "Sell",
      asset: "HBL",
      shares: 50,
      pricePerShare: 95,
      totalAmount: 4750,
    },
    {
      key: "3",
      date: "2024-09-20",
      type: "Buy",
      asset: "LUCK",
      shares: 20,
      pricePerShare: 710,
      totalAmount: 14200,
    },
    {
      key: "4",
      date: "2024-09-15",
      type: "Sell",
      asset: "UBL",
      shares: 30,
      pricePerShare: 130,
      totalAmount: 3900,
    },
    {
      key: "5",
      date: "2024-09-10",
      type: "Buy",
      asset: "FFC",
      shares: 120,
      pricePerShare: 175,
      totalAmount: 21000,
    },
  ];

  const cumulativeReturnsData = {
    ytd: { ROI: 8.5 },
    "1-year": { ROI: 12.4 },
    "5-year": { ROI: 45.2 },
  };

  const [selectedTimeframe, setSelectedTimeframe] = useState("ytd");

  const handleTimeframeChange = (e) => {
    setSelectedTimeframe(e.target.value);
  };

  const selectedData = cumulativeReturnsData[selectedTimeframe];

  return (
    <div className="portfolio">
      <div className="section">
        <div className="inner-section">
          <div className="user-info">
            <h2 className="name">{userData.name}</h2>
            <p>
              <strong>Email: </strong>
              {userData.email}
            </p>
            <p>
              <strong>Username: </strong>
              {userData.username}
            </p>
            <p>
              <strong>CDC ID: </strong>
              {userData.cdcId}
            </p>
          </div>

          <div className="portfolio-info">
            <div className="info-item">
              <h3>Total Portfolio Value</h3>
              <p>Rs. {userData.totalPortfolioValue}</p>
            </div>
            <div className="info-item">
              <h3>Invested Amount</h3>
              <p>Rs. {userData.investedAmount}</p>
            </div>
            <div className="info-item">
              <h3>Current Profit/Loss</h3>
              <p
                style={{
                  color: userData.profitLoss.value.startsWith("+")
                    ? "green"
                    : "red",
                }}
              >
                Rs. {userData.profitLoss.value} (
                {userData.profitLoss.percentage})
              </p>
            </div>
            <div className="info-item">
              <h3>Day Change</h3>
              <p
                style={{
                  color: userData.dayChange.startsWith("+") ? "green" : "red",
                }}
              >
                {userData.dayChange}
              </p>
            </div>
            <div className="info-item">
              <h3>Risk Level Indicator</h3>
              <div className={`risk-level ${userData.riskLevel}`}>
                {userData.riskLevel.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2 className="accordion-title">Stock Holdings Details</h2>
          <Button onClick={handleBuyStock} type="primary">
            Edit Stock Portfolio
          </Button>
        </div>
        <Collapse accordion>
          {stocks.map((stock, index) => (
            <Panel header={stock.name} key={index}>
              <div className="portfolio stock-details-horizontal">
                <p>
                  <strong>Current Price:</strong> {stock.currentPrice}
                </p>
                <p>
                  <strong>Price Bought:</strong> {stock.priceBought}
                </p>
                <p>
                  <strong>Quantity:</strong> {stock.quantity}
                </p>
                <p>
                  <strong>Invested Amount:</strong> {stock.investedAmount}
                </p>
                <p
                  style={{
                    color: stock.profitLoss.value.startsWith("+")
                      ? "green"
                      : "red",
                  }}
                >
                  <strong>Profit/Loss:</strong> Rs. {stock.profitLoss.value} (
                  {stock.profitLoss.percentage})
                </p>
              </div>

              <div className="btn-holder">
                <div>
                  <p className={`risk-level ${stock.riskLevel}`}>
                    <strong>Risk Level:</strong> {stock.riskLevel}
                  </p>
                </div>

                <Popconfirm
                  title={
                    <Form form={form} layout="vertical">
                      <Form.Item
                        label="Quantity to Sell"
                        name="quantityToSell"
                        initialValue={1}
                        rules={[
                          {
                            required: true,
                            message: "Please input the quantity",
                          },
                        ]}
                      >
                        <InputNumber
                          min={1}
                          max={stock.quantity}
                          onChange={(value) => setQuantityToSell(value)}
                          placeholder="Enter quantity"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Selling Price (Rs.)"
                        name="sellingPrice"
                        rules={[
                          {
                            required: true,
                            message: "Please input the selling price",
                          },
                        ]}
                      >
                        <InputNumber
                          min={0.01}
                          step={0.01}
                          onChange={(value) => setSellingPrice(value)}
                          placeholder="Enter selling price"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Form>
                  }
                  onConfirm={confirmSell(stock, sellingPrice, quantityToSell)}
                  okText="Sell"
                  cancelText="Cancel"
                >
                  <Button danger type="primary">
                    Sell Stock
                  </Button>
                </Popconfirm>
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>

      <div className="section">
        <h2 className="accordion-title">Cumulative Returns</h2>
        <Radio.Group
          defaultValue="ytd"
          style={{ marginBottom: 16 }}
          onChange={handleTimeframeChange}
        >
          <Radio.Button value="ytd">YTD</Radio.Button>
          <Radio.Button value="1-year">1-Year</Radio.Button>
          <Radio.Button value="5-year">5-Year</Radio.Button>
        </Radio.Group>

        <div className="returns-details">
          <p>
            <strong>Overall ROI:</strong> {selectedData?.ROI}%
          </p>
        </div>
      </div>

      <div className="section">
        <RiskAnalysis />
      </div>

      <div className="section">
        <h2 className="accordion-title">Top 5 Performing Stocks</h2>
        <div className="table-container">
          <Table
            columns={stockColumns}
            dataSource={topPerformers}
            pagination={false}
            rowKey="name"
          />
        </div>

        <h2 className="accordion-title">Worst 5 Performing Stocks</h2>
        <div className="table-container">
          <Table
            columns={stockColumns}
            dataSource={worstPerformers}
            pagination={false}
            rowKey="name"
          />
        </div>
      </div>

      <div className="section">
        <h2 className="accordion-title">Transaction History</h2>
        <div className="table-container">
          <Table
            columns={transactionColumns}
            dataSource={transactions}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
