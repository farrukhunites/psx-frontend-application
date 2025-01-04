import { Button, Menu, Popconfirm } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/logo.png";
import { MdOutlineDashboardCustomize, MdOutlineSpeed } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";
import BluetoothDriveIcon from "@mui/icons-material/BluetoothDrive";
import { LogoutOutlined } from "@ant-design/icons";

import "./style.css";

const Sidebar = ({ setUserType, breakpoint = null, setPage, setMode }) => {
  const path = useLocation();
  const locationPath = path.pathname;
  const navigate = useNavigate();

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
          <Link to="/stock-analysis">
            <BsFillFuelPumpFill size={20} />
            <span className="menu-item-label">Stock Analysis</span>
          </Link>
        </>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <div className="left-decor"></div>
          <Link to="/watchlists&alerts">
            <BluetoothDriveIcon size={20} />
            <span className="menu-item-label">Watchlists & Alerts</span>
          </Link>
        </>
      ),
    },
    {
      key: "5",
      label: (
        <>
          <div className="left-decor"></div>
          <Link to="/stock-news">
            <BluetoothDriveIcon size={20} />
            <span className="menu-item-label">Stock News</span>
          </Link>
        </>
      ),
    },
    {
      key: "6",
      label: (
        <>
          <div className="left-decor"></div>
          <Link to="/settings">
            <BluetoothDriveIcon size={20} />
            <span className="menu-item-label">Settings</span>
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
    } else if (locationPath.includes("/stock-analysis")) {
      setSelectedId("3");
    } else if (locationPath.includes("/watchlists&alerts")) {
      setSelectedId("4");
    } else if (locationPath.includes("/stock-news")) {
      setSelectedId("5");
    } else if (locationPath.includes("/settings")) {
      setSelectedId("6");
    }
  }, [locationPath]);

  const handleLogout = () => {
    setUserType("public");
    navigate("/login");
  };

  return (
    <Sider
      className="sidebar"
      width={231}
      theme="light"
      breakpoint={breakpoint}
      collapsedWidth="0"
      style={{ height: "100% !important", position: "fixed" }}
    >
      <div>
        <div className="logo-container">
          <img
            style={{ width: "180px", padding: "5px" }}
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

      <div className="footer">
        <Popconfirm
          title="Logout Application"
          description="Are you sure you want to logout?"
          onConfirm={handleLogout}
        >
          <Button
            style={{ width: "100%" }}
            icon={<LogoutOutlined />}
            type="primary"
          >
            Logout
          </Button>
        </Popconfirm>
      </div>
    </Sider>
  );
};

export default Sidebar;
