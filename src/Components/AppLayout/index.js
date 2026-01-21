import React from "react";
import Sidebar from "../Sidebar";

import { Layout } from "antd";
import "./style.css";

const { Content } = Layout;

const AppLayout = ({ setUserType, setUserData, contents }) => {
  return (
    // <div className="app-layout">
    <Layout className="app-layout" style={{ minHeight: "100vh" }}>
      <Sidebar
        setUserType={setUserType}
        setUserData={setUserData}
        breakpoint="md"
      />
      <Layout className="site-layout" style={{ minHeight: "100vh" }}>
        <Content className="content">{contents}</Content>
      </Layout>
    </Layout>
    // </div>
  );
};

export default AppLayout;
