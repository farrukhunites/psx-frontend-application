import { Button, Checkbox, Form, Input, Radio, Tag, message } from "antd";
import { LockOutlined, UserOutlined, StockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../Assets/Images/logo.png";
import "./style.css";

const Signup = ({ setUserType }) => {
  const navigate = useNavigate();
  const [riskPreference, setRiskPreference] = useState("moderate");

  const onFinish = (values) => {
    console.log("Finish:", values);

    if (values?.password === values?.confirmPassword) {
      message.success("Sign Up successful!");
      setUserType("user");
      navigate("/dashboard");
    } else {
      message.error("The passwords entered do not match!");
    }
  };

  const goToCDC = () => {
    window.open("https://csp.cdcaccess.com.pk/", "_self");
  };

  const onRiskChange = (e) => {
    setRiskPreference(e.target.value);
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
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
            className="login-input"
          />
        </Form.Item>

        <Form.Item
          name="riskPreference"
          label="Risk Preference"
          rules={[
            {
              required: true,
              message: "Please select your risk preference!",
            },
          ]}
        >
          <Radio.Group onChange={onRiskChange} value={riskPreference}>
            <Radio value="low">Low Risk</Radio>
            <Radio value="moderate">
              Moderate Risk &emsp; <Tag color="green">Recommended</Tag>
            </Radio>
            <Radio value="high">High Risk</Radio>
          </Radio.Group>
        </Form.Item>

        <div className="login-options">
          <Checkbox className="login-remember">Remember Me</Checkbox>
          <Link to="/forgot-password" className="login-forgot">
            Forgot password?
          </Link>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button">
            Sign Up
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
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
