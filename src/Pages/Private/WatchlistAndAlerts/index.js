import React, { useEffect, useState } from "react";
import {
  List,
  Button,
  Modal,
  Form,
  InputNumber,
  Select,
  Alert,
  message,
} from "antd";
import "./style.css";
import { getAllStocks } from "../../../API/Stocks";
import {
  createWatchList,
  deleteWatchList,
  getWatchListData,
} from "../../../API/Watchlist";
import { createAlert, deleteAlert, getAlerts } from "../../../API/Alerts";

const { Option } = Select;

const WatchlistAndAlerts = ({ userData }) => {
  // States
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistId, setWatchlistId] = useState(null);
  const [alertList, setAlertList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form] = Form.useForm();

  const getWatchList = async () => {
    try {
      const data = await getWatchListData(userData?.id); // Fetch data using API function
      setWatchlist(data);
    } catch (err) {
      console.log(err); // Set error if API call fails
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const getAlertList = async () => {
    try {
      const data = await getAlerts(userData?.id); // Fetch data using API function
      setAlertList(data);
    } catch (err) {
      console.log(err); // Set error if API call fails
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  useEffect(() => {
    const getStocksData = async () => {
      try {
        const data = await getAllStocks(); // Fetch data using API function
        setStockData(data);
      } catch (err) {
        console.log(err); // Set error if API call fails
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    getStocksData();

    if (userData?.id) {
      getWatchList();
      getAlertList();
    }
  }, []);

  const addToWatchlist = async (stock) => {
    try {
      const data = await createWatchList(userData?.id, stock); // Fetch data using API function
      getWatchList();
      message.success("Added to Watchlist");
    } catch (err) {
      console.log(err); // Set error if API call fails
      message.error(err);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const openAlertModal = (id) => {
    setWatchlistId(id);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const setAlert = async (values) => {
    console.log(values, watchlistId, userData?.id);

    try {
      const data = await createAlert(
        userData?.id,
        watchlistId,
        values?.condition,
        values?.price
      ); // Fetch data using API function
      getAlertList();
      message.success("Alert Added");
    } catch (err) {
      console.log(err); // Set error if API call fails
      message.error(err);
    } finally {
      setLoading(false); // Stop loading indicator
    }

    setIsModalVisible(false);
    form.resetFields();
  };

  const removeFromWatchlist = async (stock) => {
    try {
      console.log(userData?.id, stock);
      const data = await deleteWatchList(userData?.id, stock); // Fetch data using API function
      getWatchList();
      getAlertList();
      message.success(`Deleted Succesfully`);
    } catch (err) {
      console.log(err);
      message.error(err);
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = async (id) => {
    console.log(id);

    try {
      const data = await deleteAlert(id); // Fetch data using API function

      getAlertList();
      message.success(`Deleted Alert Succesfully`);
    } catch (err) {
      console.log(err);
      message.error(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(watchlist);

  const filteredAlerts = alertList.filter((alert) => alert?.fulfilled);
  const filteredAlerts2 = alertList.filter((alert) => !alert?.fulfilled);

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
            onChange={(value) => addToWatchlist(value)}
            filterOption={
              (input, option) =>
                option.value.toLowerCase().includes(input.toLowerCase()) // Use option.value directly
            }
          >
            {stockData.map((stock) => (
              <Option key={stock?.stock_symbol} value={stock?.stock_symbol}>
                {`${stock?.stock_name} (${stock?.stock_symbol})`}{" "}
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
                    onClick={() => removeFromWatchlist(stock?.stock_symbol)}
                    key="remove"
                  >
                    Remove
                  </Button>,
                  <Button
                    type="primary"
                    onClick={() => openAlertModal(stock?.id)}
                    key="set-alert"
                  >
                    Set Alert
                  </Button>,
                ]}
              >
                <div className="stock-detail">
                  <strong>
                    {stock?.stock_name} ({stock?.stock_symbol})
                  </strong>
                  <p>Current Price: Rs. {stock?.current_price}</p>
                  <p>Volume: {stock?.volume}</p>

                  <p>Risk Level: {stock.risk_level}</p>
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
            {filteredAlerts.length > 0 ? (
              <List
                size="large"
                bordered
                dataSource={filteredAlerts}
                renderItem={(alert) => (
                  <List.Item>
                    <Alert
                      message={`Alert triggered for ${alert?.stock_name} (${alert?.stock_symbol})`}
                      description={`Condition: Price ${
                        alert?.condition === "above" ? ">" : "<"
                      } Rs. ${alert?.price}`}
                      type="success"
                      showIcon
                      action={
                        <Button
                          size="small"
                          type="link"
                          onClick={() => closeAlert(alert?.id)}
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
            {filteredAlerts2.length > 0 ? (
              <List
                size="large"
                bordered
                dataSource={filteredAlerts2}
                renderItem={(alert) => (
                  <List.Item>
                    <Alert
                      message={`Alert set for ${alert?.stock_name} (${alert?.stock_symbol})`}
                      description={`Condition: Price ${
                        alert?.condition === "above" ? ">" : "<"
                      } Rs. ${alert?.price}`}
                      type="info"
                      showIcon
                      action={
                        <Button
                          size="small"
                          type="link"
                          onClick={() => closeAlert(alert?.id)}
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
