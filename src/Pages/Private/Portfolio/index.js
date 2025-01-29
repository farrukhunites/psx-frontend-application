import React, { useEffect, useState } from "react";
import "./style.css";
import {
  Button,
  Collapse,
  Form,
  InputNumber,
  Popconfirm,
  Radio,
  Table,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import RiskAnalysis from "./RiskAnalysis";
import ClipLoader from "react-spinners/ClipLoader";
import { getPortfolio } from "../../../API/Portfolio";
import { createTransaction, getTransactions } from "../../../API/Transactions";
import dayjs from "dayjs";

const { Panel } = Collapse;

const Portfolio = ({ userData }) => {
  const [data, setData] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPortfolioData = async () => {
    try {
      const data = await getPortfolio(userData?.id); // Fetch data using API function
      setData(data);
    } catch (err) {
      console.log(err); // Set error if API call fails
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(userData?.id); // Fetch data using API function
        setTransactions(data?.transactions);
      } catch (err) {
        console.log(err); // Set error if API call fails
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    if (userData?.id) {
      fetchPortfolioData();
      fetchTransactions(); // Trigger API call
    }
  }, [userData]);

  const [form] = Form.useForm();
  const [quantityToSell, setQuantityToSell] = useState(1);
  const [sellingPrice, setSellingPrice] = useState(0);

  console.log(sellingPrice, quantityToSell);

  const navigate = useNavigate();

  const handleSellStock = async (symbol) => {
    const timestamp = dayjs().toISOString();

    const data = {
      type: "sell",
      stock_symbol: symbol,
      timestamp,
      price_per_share: sellingPrice,
      shares: quantityToSell,
    };

    try {
      const res = await createTransaction(userData?.id, data); // Fetch data using API function
      await fetchPortfolioData();
      message.success("Stock sold successfully!");
    } catch (err) {
      console.log(err); // Set error if API call fails
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handleBuyStock = () => {
    navigate("/buy-stock");
  };
  const confirmSell = (symbol) => {
    console.log(symbol);
    handleSellStock(symbol);
  };

  const stockColumns = [
    {
      title: "Stock Name",
      dataIndex: "stock_name",
      key: "name",
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
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
      render: (text, record) => {
        const investedAmount = record?.quantity * record?.price_bought;
        return investedAmount ? investedAmount.toFixed(2) : "-"; // Format to 2 decimal places
      },
    },
    {
      title: "Profit/Loss",
      dataIndex: "profitLoss",
      key: "profitLoss",
      render: (text, record) => (
        <span style={{ color: record?.profit_loss > 0 ? "green" : "red" }}>
          Rs. {record?.profit_loss_value} ({record?.profit_loss})
        </span>
      ),
      sorter: (a, b) => a.profit_loss_value - b.profit_loss_value,
    },
  ];

  const transactionColumns = [
    {
      title: "Date of Transaction",
      dataIndex: "transaction_date",
      key: "date",
      render: (text) => {
        if (!text) return "-"; // Handle cases where the date is null or undefined

        // Convert the date string into a Date object
        const date = new Date(text);

        // Extract day, month, and year
        const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const year = date.getFullYear();

        // Format as dd-mm-yyyy
        return `${day}-${month}-${year}`;
      },
    },
    {
      title: "Type of Transaction",
      dataIndex: "transaction_type",
      key: "type",
    },
    {
      title: "Asset/Ticker",
      dataIndex: "stock_symbol",
      key: "asset",
    },
    {
      title: "Number of Shares/Units",
      dataIndex: "shares",
      key: "shares",
    },
    {
      title: "Price per Share/Unit (Rs.)",
      dataIndex: "price_per_share",
      key: "pricePerShare",
      render: (pricePerShare) => `Rs. ${pricePerShare}`,
    },
    {
      title: "Total Transaction Amount (Rs.)",
      dataIndex: "total_value",
      key: "totalAmount",
      render: (totalAmount) => `Rs. ${totalAmount}`,
    },
  ];

  const cumulativeReturnsData = {
    ytd: { ROI: data?.cumulative_return_ytd },
    "1-year": { ROI: data?.cumulative_return_1yr },
    "5-year": { ROI: data?.cumulative_return_5yr },
  };

  const [selectedTimeframe, setSelectedTimeframe] = useState("ytd");

  const handleTimeframeChange = (e) => {
    setSelectedTimeframe(e.target.value);
  };

  const selectedData = cumulativeReturnsData[selectedTimeframe];

  if (loading) {
    <div className="loader">
      <ClipLoader color="#4A90E2" size={50} />
    </div>;
  }

  console.log(userData);

  return (
    <div className="portfolio">
      <div className="section">
        <div className="inner-section">
          <div className="user-info">
            <h2 className="name">{userData?.name}</h2>
            <p>
              <strong>Email: </strong>
              {userData?.email}
            </p>
            <p>
              <strong>Username: </strong>
              {userData?.username}
            </p>
            <p>
              <strong>CDC ID: </strong>
              {userData?.cdc_id}
            </p>
          </div>

          <div className="portfolio-info">
            <div className="info-item">
              <h3>Total Portfolio Value</h3>
              <p>Rs. {data?.current_stock_holding}</p>
            </div>
            <div className="info-item">
              <h3>Invested Amount</h3>
              <p>Rs. {data?.invested_amount}</p>
            </div>
            <div className="info-item">
              <h3>Current Profit/Loss</h3>
              <p
                style={{
                  color: data?.profit_loss_value > 0 ? "green" : "red",
                }}
              >
                Rs. {data?.profit_loss_value} ({data?.profit_loss})
              </p>
            </div>
            <div className="info-item">
              <h3>Day Change</h3>
              <p
                style={{
                  color: data?.day_change > 0 ? "green" : "red",
                }}
              >
                {data?.day_change}%
              </p>
            </div>
            <div className="info-item">
              <h3>Risk Level Indicator</h3>
              <div className={`risk-level ${userData?.risk_preference}`}>
                {userData?.risk_preference?.toUpperCase()}
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
          {data?.stock_holding_details?.map((stock, index) => (
            <Panel
              header={`${stock?.stock_name} (${stock?.stock_symbol})`}
              key={index}
            >
              <div className="portfolio stock-details-horizontal">
                <p>
                  <strong>Current Price:</strong> {stock?.current_price}
                </p>
                <p>
                  <strong>Price Bought:</strong> {stock?.price_bought}
                </p>
                <p>
                  <strong>Quantity:</strong> {stock?.quantity}
                </p>
                <p>
                  <strong>Invested Amount:</strong>{" "}
                  {stock?.price_bought * stock?.quantity}
                </p>
                <p
                  style={{
                    color: stock?.profit_loss_value > 0 ? "green" : "red",
                  }}
                >
                  <strong>Profit/Loss:</strong> Rs. {stock?.profit_loss_value} (
                  {stock?.profit_loss}%)
                </p>
              </div>

              <div className="btn-holder">
                <div>
                  <p className={`risk-level ${stock?.risk_preference}`}>
                    <strong>Risk Level:</strong>{" "}
                    {stock?.risk_preference?.toUpperCase()}
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
                  onConfirm={() => confirmSell(stock?.stock_symbol)}
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
            <strong>Overall ROI:</strong> {selectedData?.ROI}
          </p>
        </div>
      </div>

      <div className="section">
        <RiskAnalysis
          risk_level_per={data?.risk_level_indicator}
          std={data?.std}
          valueAtRisk1={data?.var}
          market_sensitivity={data?.market_sensitivity}
          impact={data?.impact}
        />
      </div>

      <div className="section">
        <h2 className="accordion-title">Top 5 Performing Stocks</h2>
        <div className="table-container">
          <Table
            columns={stockColumns}
            dataSource={data?.top_stocks?.slice().reverse()}
            pagination={false}
            rowKey="name"
          />
        </div>

        <h2 className="accordion-title">Worst 5 Performing Stocks</h2>
        <div className="table-container">
          <Table
            columns={stockColumns}
            dataSource={data?.worst_stocks}
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
