import React from "react";
import { Row, Col, Card, Table } from "antd";

const sampleData = [
  {
    key: "1",
    stock: "PSX: HBL",
    shares: 100,
    price: 150,
    value: 15000,
  },
  {
    key: "2",
    stock: "PSX: MCB",
    shares: 50,
    price: 200,
    value: 10000,
  },
  {
    key: "3",
    stock: "PSX: ENGRO",
    shares: 75,
    price: 250,
    value: 18750,
  },
];

const columns = [
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Shares",
    dataIndex: "shares",
    key: "shares",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
];

function Portfolio() {
  const totalInvested = sampleData.reduce((acc, item) => acc + item.value, 0);
  const totalProfit = 5000; // Placeholder value
  const totalLoss = 2000; // Placeholder value

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Invested" bordered={false}>
            <p>{totalInvested}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Profit" bordered={false}>
            <p>{totalProfit}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Loss" bordered={false}>
            <p>{totalLoss}</p>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="Stock Holdings" bordered={false}>
            <Table dataSource={sampleData} columns={columns} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Portfolio;
