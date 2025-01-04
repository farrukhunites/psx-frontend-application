import React, { useState } from "react";
import { List, Button, Modal, Form, InputNumber, Select, Alert } from "antd";
import "./style.css";

const { Option } = Select;

const WatchlistAndAlerts = () => {
  // States
  const [watchlist, setWatchlist] = useState([]);
  const [alertList, setAlertList] = useState([]);
  const [fulfilledAlerts, setFulfilledAlerts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const [form] = Form.useForm();

  const stockOptions = [
    {
      name: "Oil & Gas Development Company",
      ticker: "OGDC",
      currentPrice: 160,
      volume: 120000,
      marketCap: "50B",
      riskLevel: "medium",
    },
    {
      name: "Habib Bank Limited",
      ticker: "HBL",
      currentPrice: 95,
      volume: 80000,
      marketCap: "40B",
      riskLevel: "high",
    },
    {
      name: "Lucky Cement",
      ticker: "LUCK",
      currentPrice: 710,
      volume: 50000,
      marketCap: "30B",
      riskLevel: "low",
    },
    {
      name: "United Bank Limited",
      ticker: "UBL",
      currentPrice: 130,
      volume: 70000,
      marketCap: "35B",
      riskLevel: "medium",
    },
    {
      name: "Fauji Fertilizer Company",
      ticker: "FFC",
      currentPrice: 175,
      volume: 60000,
      marketCap: "25B",
      riskLevel: "low",
    },
    {
      name: "Pakistan Petroleum Limited",
      ticker: "PPL",
      currentPrice: 190,
      volume: 65000,
      marketCap: "45B",
      riskLevel: "medium",
    },
  ];

  const addToWatchlist = (stock) => {
    if (!watchlist.find((s) => s.ticker === stock.ticker)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  const openAlertModal = (stock) => {
    setSelectedStock(stock);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const setAlert = (values) => {
    const alert = {
      stock: selectedStock,
      price: values.price,
      condition: values.condition,
    };
    setAlertList([...alertList, alert]);
    setFulfilledAlerts([...fulfilledAlerts, alert]);
    setIsModalVisible(false);
    form.resetFields();
  };

  //   const checkAlerts = () => {
  //     const currentAlerts = alertList.filter((alert) => {
  //       const stock = alert.stock;
  //       const conditionMet =
  //         alert.condition === "above"
  //           ? stock.currentPrice > alert.price
  //           : stock.currentPrice < alert.price;
  //       if (conditionMet) {
  //         setFulfilledAlerts((prev) => [...prev, alert]);
  //       }
  //       return !conditionMet;
  //     });

  //     setAlertList(currentAlerts);
  //   };

  const removeFromWatchlist = (ticker) => {
    setWatchlist(watchlist.filter((stock) => stock.ticker !== ticker));
    setAlertList(alertList.filter((alert) => alert.stock.ticker !== ticker));
  };

  const closeAlert = (alert) => {
    setAlertList(alertList.filter((a) => a !== alert));
  };

  const closeFulfilledAlert = (alert) => {
    setFulfilledAlerts(fulfilledAlerts.filter((a) => a !== alert));
  };

  return (
    <div className="watchlist-alerts-page">
      <h2>Watchlist & Alerts</h2>

      <div className="section">
        <div className="section-inner">
          <h3 className="accordion-title">Your Watchlist</h3>
          <Select
            placeholder="Add a stock to your watchlist"
            style={{ width: 300 }}
            showSearch // Enable search functionality
            onChange={(value) =>
              addToWatchlist(stockOptions.find((s) => s.ticker === value))
            }
            filterOption={
              (input, option) =>
                option.value.toLowerCase().includes(input.toLowerCase()) // Use option.value directly
            }
          >
            {stockOptions.map((stock) => (
              <Option key={stock.ticker} value={stock.ticker}>
                {`${stock.name} (${stock.ticker})`}{" "}
                {/* Convert to a single string */}
              </Option>
            ))}
          </Select>
          <List
            size="large"
            bordered
            dataSource={watchlist}
            renderItem={(stock) => (
              <List.Item
                actions={[
                  <Button
                    type="danger"
                    onClick={() => removeFromWatchlist(stock.ticker)}
                    key="remove"
                  >
                    Remove
                  </Button>,
                  <Button
                    type="primary"
                    onClick={() => openAlertModal(stock)}
                    key="set-alert"
                  >
                    Set Alert
                  </Button>,
                ]}
              >
                <div className="stock-detail">
                  <strong>
                    {stock.name} ({stock.ticker})
                  </strong>
                  <p>Current Price: Rs. {stock.currentPrice}</p>
                  <p>Volume: {stock.volume}</p>
                  <p>Market Cap: {stock.marketCap}</p>
                  <p>Risk Level: {stock.riskLevel}</p>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>

      <div className="section">
        <div className="section-inner">
          <h3 className="accordion-title">Your Alerts</h3>
          <div className="fulfilled-alerts">
            <h3>Fullfilled Alerts</h3>
            {fulfilledAlerts.length > 0 ? (
              <List
                size="large"
                bordered
                dataSource={fulfilledAlerts}
                renderItem={(alert) => (
                  <List.Item>
                    <Alert
                      message={`Alert triggered for ${alert.stock.name} (${alert.stock.ticker})`}
                      description={`Condition: Price ${
                        alert.condition === "above" ? ">" : "<"
                      } Rs. ${alert.price}`}
                      type="success"
                      showIcon
                      action={
                        <Button
                          size="small"
                          type="link"
                          onClick={() => closeFulfilledAlert(alert)}
                        >
                          Close
                        </Button>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <p>No alerts fulfilled yet.</p>
            )}
          </div>
          <div className="remaining-alerts">
            <h3>Remaining Alerts</h3>
            {alertList.length > 0 ? (
              <List
                size="large"
                bordered
                dataSource={alertList}
                renderItem={(alert) => (
                  <List.Item>
                    <Alert
                      message={`Alert set for ${alert.stock.name} (${alert.stock.ticker})`}
                      description={`Condition: Price ${
                        alert.condition === "above" ? ">" : "<"
                      } Rs. ${alert.price}`}
                      type="info"
                      showIcon
                      action={
                        <Button
                          size="small"
                          type="link"
                          onClick={() => closeAlert(alert)}
                        >
                          Close
                        </Button>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <p>No alerts set yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Set Alert Modal */}
      <Modal
        title={`Set Alert for ${selectedStock ? selectedStock.name : ""}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={setAlert} layout="vertical">
          <Form.Item
            name="price"
            label="Price (Rs.)"
            rules={[{ required: true, message: "Please enter a price" }]}
          >
            <InputNumber
              min={0.01}
              step={0.01}
              placeholder="Enter price to trigger alert"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="condition"
            label="Condition"
            rules={[{ required: true, message: "Please select a condition" }]}
          >
            <Select placeholder="Select condition">
              <Option value="above">Above</Option>
              <Option value="below">Below</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Set Alert
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WatchlistAndAlerts;
