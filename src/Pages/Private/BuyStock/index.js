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

const { Option } = Select;
const { Dragger } = Upload;

const stockList = [
  {
    name: "Oil & Gas Development Company",
    shortName: "OGDC",
    riskLevel: "medium",
  },
  { name: "Habib Bank Limited", shortName: "HBL", riskLevel: "high" },
  { name: "Lucky Cement", shortName: "LUCK", riskLevel: "low" },
  { name: "United Bank Limited", shortName: "UBL", riskLevel: "medium" },
  { name: "Fauji Fertilizer Company", shortName: "FFC", riskLevel: "low" },
  { name: "Pakistan Petroleum Limited", shortName: "PPL", riskLevel: "medium" },
  { name: "Engro Corporation", shortName: "ENGRO", riskLevel: "high" },
  { name: "Sui Northern Gas Pipelines", shortName: "SNGP", riskLevel: "low" },
  {
    name: "Dawood Hercules Corporation",
    shortName: "DAWH",
    riskLevel: "medium",
  },
  { name: "Bank Alfalah", shortName: "BAFL", riskLevel: "high" },
  { name: "National Bank of Pakistan", shortName: "NBP", riskLevel: "medium" },
  { name: "Meezan Bank", shortName: "MEBL", riskLevel: "low" },
  { name: "Millat Tractors", shortName: "MTL", riskLevel: "high" },
  { name: "Nishat Mills", shortName: "NML", riskLevel: "medium" },
  { name: "Pakistan State Oil", shortName: "PSO", riskLevel: "high" },
  { name: "Kot Addu Power Company", shortName: "KAPCO", riskLevel: "low" },
  { name: "Pak Suzuki Motors", shortName: "PSMC", riskLevel: "medium" },
  { name: "TRG Pakistan", shortName: "TRG", riskLevel: "high" },
  { name: "Hub Power Company", shortName: "HUBC", riskLevel: "low" },
  { name: "Gul Ahmed Textile Mills", shortName: "GATM", riskLevel: "medium" },
];

const AddStock = () => {
  const [form] = Form.useForm();
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sharePrice, setSharePrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(fileList, fileList.length);

  const onFinish = (values) => {
    console.log("Received values:", values);
    setLoading(true);

    setTimeout(() => {
      message.success("Stock bought successfully!");
      setLoading(false);
      navigate("/portfolio");
    }, 2000);
  };

  const handleStockChange = (value) => {
    const stock = stockList.find((stock) => stock.name === value);
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

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  useEffect(() => {
    setPurchasePrice(sharePrice * quantity);
  }, [sharePrice, quantity]);

  return (
    <div className="add-stock">
      <div className="section">
        <h2>Bulk Buy/Sell Stocks</h2>
        <Form
          layout="vertical"
          onFinish={() => {
            message.success("PDF files uploaded successfully!");
          }}
        >
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
            name="stockName"
            label="Stock Name"
            rules={[{ required: true, message: "Please select a stock" }]}
          >
            <Select placeholder="Select stock" onChange={handleStockChange}>
              {stockList.map((stock, index) => (
                <Option key={index} value={stock.name}>
                  {`${stock.name} (${stock.shortName})`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
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
            name="quantity"
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

          <Form.Item name="riskLevel" label="Risk Level">
            <div className={selectedStock?.riskLevel}>
              <Input
                value={selectedStock?.riskLevel.toUpperCase() || ""}
                readOnly
                disabled
              />
            </div>
          </Form.Item>

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
