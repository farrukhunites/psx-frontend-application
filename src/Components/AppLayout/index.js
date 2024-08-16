import React from "react";
import Sidebar from "../Sidebar";

import { Layout } from "antd";
import "./style.css";

const { Content } = Layout;

const AppLayout = ({ contents }) => {
  return (
    <div className="app-layout">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar breakpoint="md" />
        <Layout className="site-layout">
          <Content className="content">{contents}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
