import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined, StockOutlined } from "@ant-design/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../Assets/Images/logo.png";
import "./style.css";

const Login = ({ setUserType }) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Finish:", values);
    setUserType("user");
    navigate("/dashboard");
  };

  const goToCDC = () => {
    window.open("https://csp.cdcaccess.com.pk/", "_self");
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="Psx-logo" />
      </div>
      <div className="login-welcome">Welcome to PSX Application</div>
      <Form layout="vertical" onFinish={onFinish} className="login-form">
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            className="login-input"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            className="login-input"
          />
        </Form.Item>

        <div className="login-options">
          <Checkbox className="login-remember">Remember Me</Checkbox>
          <Link to="/forgot-password" className="login-forgot">
            Forgot password?
          </Link>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button">
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className="login-divider">or</div>
      <Button
        onClick={goToCDC}
        icon={<StockOutlined />}
        className="login-google-button"
      >
        Sign in with CDC Access
      </Button>
      <div className="login-signup">
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
