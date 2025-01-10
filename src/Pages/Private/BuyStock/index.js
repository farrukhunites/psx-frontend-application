import React, { useEffect, useState } from "react";
import {
  Button,
  InputNumber,
  DatePicker,
  Select,
  Form,
  message,
  Input,
  Upload,
} from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import "./style.css";
import { getAllStocks } from "../../../API/Stocks";
import dayjs from "dayjs";
import { bulkTransaction, createTransaction } from "../../../API/Transactions";

const { Option } = Select;
const { Dragger } = Upload;

const AddStock = ({ userData }) => {
  const [form] = Form.useForm();
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sharePrice, setSharePrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stockList, setStockData] = useState([]);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Received values:", values);
    setLoading(true);

    const purchaseDate = values.purchaseDate?.$d; // Access the native Date object
    const timestamp = purchaseDate
      ? dayjs(purchaseDate).toISOString() // Convert to ISO 8601 format
      : null;

    const data = {
      ...values,
      type: "buy",
      timestamp, // Add the converted timestamp
    };

    try {
      const res = await createTransaction(userData?.id, data); // Fetch data using API function
      setTimeout(() => {
        message.success("Stock bought successfully!");
        setLoading(false);
        navigate("/portfolio");
      }, 2000);
    } catch (err) {
      console.log(err); // Set error if API call fails
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handleStockChange = (value) => {
    const stock = stockList.find((stock) => stock.stock_symbol === value);
    setSelectedStock(stock);
    form.setFieldsValue({ riskLevel: stock?.riskLevel });
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handlePriceChange = (value) => {
    setSharePrice(value);
  };

  const beforeUpload = (file) => {
    file.preventDefault();
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error(`${file.name} is not a PDF file`);
      return false;
    }
    if (fileList.length > 0) {
      message.error(`You can only upload one file at a time.`);
      return false;
    }
    return isPDF || Upload.LIST_IGNORE;
  };

  const handleFileChange = async ({ fileList }) => {
    setFileList(fileList);
  };
  const handleFileFinish = async () => {
    if (fileList.length === 0) {
      message.error("Please upload a file.");
      return;
    }

    const formData = new FormData();
    const file = fileList[0]?.originFileObj;
    if (!file) {
      message.error("No file found in the upload list.");
      return;
    }

    formData.append("file", file);

    setLoading(true);

    try {
      const res = await bulkTransaction(userData?.id, formData);

      setTimeout(() => {
        message.success("Stock bought successfully!");
        setLoading(false);
        navigate("/portfolio");
      }, 2000);
    } catch (err) {
      console.error("Error uploading file:", err);
      message.error("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPurchasePrice(sharePrice * quantity);
    const getStocksData = async () => {
      try {
        const data = await getAllStocks();
        setStockData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getStocksData();
  }, [sharePrice, quantity]);

  return (
    <div className="add-stock">
      <div className="section">
        <h2>Bulk Buy/Sell Stocks</h2>
        <Form layout="vertical" onFinish={handleFileFinish}>
          <Form.Item
            name="bulkUpload"
            label="Upload PDF Files"
            rules={[{ required: true, message: "Please upload PDF files" }]}
          >
            <Dragger
              beforeUpload={beforeUpload}
              onChange={handleFileChange}
              fileList={fileList}
              multiple={false}
              maxCount={1}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag PDF to this area to upload
              </p>
              <p className="ant-upload-hint">Only PDF files are allowed.</p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={fileList.length === 0}
            >
              Upload PDF
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="section">
        <h2>Add Stock</h2>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            stockName: "",
            price: 0,
            quantity: 1,
            riskLevel: "",
          }}
        >
          <Form.Item
            name="stock_symbol"
            label="Stock Name"
            rules={[{ required: true, message: "Please select a stock" }]}
          >
            <Select placeholder="Select stock" onChange={handleStockChange}>
              {stockList.map((stock, index) => (
                <Option key={index} value={stock.stock_symbol}>
                  {`${stock.stock_name} (${stock.stock_symbol})`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="price_per_share"
            label="Price per Share (Rs.)"
            rules={[
              { required: true, message: "Please enter the price per share" },
            ]}
          >
            <InputNumber
              min={1}
              step={0.01}
              placeholder="Enter price per share"
              value={sharePrice}
              onChange={handlePriceChange}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="shares"
            label="Quantity"
            rules={[{ required: true, message: "Please enter the quantity" }]}
          >
            <InputNumber
              min={1}
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Enter quantity"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="purchaseDate"
            label="Purchase Date"
            rules={[
              { required: true, message: "Please select a purchase date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="purchasePrice" label="Purchase Price">
            <span>
              <strong>Rs. {purchasePrice}</strong>
            </span>
          </Form.Item>

          {/* <Form.Item name="riskLevel" label="Risk Level">
            <div className={selectedStock?.riskLevel}>
              <Input
                value={selectedStock?.riskLevel.toUpperCase() || ""}
                readOnly
                disabled
              />
            </div>
          </Form.Item> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={!selectedStock}
            >
              Add Stock
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddStock;
