import React from "react";
import { Layout, Menu, Breadcrumb, Row, Col, Card } from "antd";
import { LineChart, BarChart } from "./Charts";
import "./style.css";

const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Dashboard</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Row gutter={16} className="graphs">
              <Col span={8}>
                <Card title="Other Data" bordered={false}>
                  <p>Data Content</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Line Chart" bordered={false}>
                  <LineChart />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Bar Chart" bordered={false}>
                  <BarChart />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Dashboard;
