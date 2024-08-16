import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../Assets/Images/logo.png";
import { MdOutlineDashboardCustomize, MdOutlineSpeed } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";
import BluetoothDriveIcon from "@mui/icons-material/BluetoothDrive";

import "./style.css";

const Sidebar = ({ breakpoint = null, setPage, setMode }) => {
  const path = useLocation();
  const locationPath = path.pathname;

  const [selectedId, setSelectedId] = useState("1");

  const items = [
    {
      key: "1",
      label: (
        <>
          <div className="left-decor"></div>
          <Link to="/dashboard">
            <MdOutlineDashboardCustomize size={20} />
            <span className="menu-item-label">Dashboard</span>
          </Link>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div className="left-decor"></div>
          <Link to="/portfolio">
            <MdOutlineSpeed size={20} />
            <span className="menu-item-label">Portfolio</span>
          </Link>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <div className="left-decor"></div>
          <Link to="/stock-details">
            <BsFillFuelPumpFill size={20} />
            <span className="menu-item-label">Top Stock</span>
          </Link>
        </>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <div className="left-decor"></div>
          <Link to="/settings">
            <BluetoothDriveIcon size={20} />
            <span className="menu-item-label">User Settings</span>
          </Link>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (locationPath.includes("/dashboard")) {
      setSelectedId("1");
    } else if (locationPath.includes("/portfolio")) {
      setSelectedId("2");
    } else if (locationPath.includes("/stock-details")) {
      setSelectedId("3");
    } else if (locationPath.includes("/settings")) {
      setSelectedId("4");
    }
  }, [locationPath]);

  return (
    <Sider
      className="sidebar"
      width={231}
      theme="light"
      breakpoint={breakpoint}
      collapsedWidth="0"
      style={{ height: "100vh", position: "fixed" }}
    >
      <div>
        <div className="logo-container">
          <img
            style={{ width: "150px", padding: "5px" }}
            src={logo}
            alt="test-logo"
          />
        </div>
        <div style={{ height: "fit-content" }}>
          <Menu
            defaultSelectedKeys={["1"]}
            selectedKeys={[selectedId]}
            mode="inline"
            theme="light"
            items={items}
          />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
