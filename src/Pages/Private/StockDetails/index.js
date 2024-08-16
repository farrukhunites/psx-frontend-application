import React from "react";
import { Row, Col, Card, Table } from "antd";
import ReactApexChart from "react-apexcharts";

const stockPriceHistory = {
  series: [
    {
      name: "Price",
      data: [20, 22, 24, 23, 25, 27, 30, 32, 35, 34],
    },
  ],
  options: {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
  },
};

const keyMetrics = {
  revenue: 500000,
  profit: 120000,
  marketCap: 1500000,
  peRatio: 25,
};

const holdingsData = [
  {
    key: "1",
    metric: "Revenue",
    value: `${keyMetrics.revenue} PKR`,
  },
  {
    key: "2",
    metric: "Profit",
    value: `${keyMetrics.profit} PKR`,
  },
  {
    key: "3",
    metric: "Market Cap",
    value: `${keyMetrics.marketCap} PKR`,
  },
  {
    key: "4",
    metric: "P/E Ratio",
    value: keyMetrics.peRatio,
  },
];

const columns = [
  {
    title: "Metric",
    dataIndex: "metric",
    key: "metric",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
];

function StockDetails() {
  return (
    <div>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="EFERT Stock Price History" bordered={false}>
            <ReactApexChart
              options={stockPriceHistory.options}
              series={stockPriceHistory.series}
              type="line"
              height={350}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={12}>
          <Card title="Key Financial Metrics" bordered={false}>
            <Table
              dataSource={holdingsData}
              columns={columns}
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Stock Performance" bordered={false}>
            <ReactApexChart
              options={stockPriceHistory.options}
              series={stockPriceHistory.series}
              type="bar"
              height={350}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default StockDetails;
