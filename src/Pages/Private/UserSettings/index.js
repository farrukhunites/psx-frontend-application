import React from "react";
import "./style.css";
import { Button, Form, Input, Tabs } from "antd";
import uploadLogo from "../../../Assets/Icons/uploadLogo.svg";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const UserSettings = () => {
  const size = "large";

  const onFinishReg = (values) => {
    console.log("Received values:", values);
  };

  const onFinishPass = (values) => {
    console.log("Received values:", values);
  };

  const onFinishOrg = (values) => {
    console.log("Received values:", values);
  };

  const props = {
    name: "file",
    multiple: false,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const pageData = [
    {
      key: 1,
      tabName: "Account",
      body: (
        <div className="tab-page">
          <div className="section">
            <div className="left">
              <div className="title">
                <span>Personal Information</span>
                <span style={{ color: "red" }}> *</span>
              </div>
              <div className="desc">
                <span>
                  Update your contact details and keep your profile information
                  current.
                </span>
              </div>
            </div>

            <div className="right">
              <div className="form-container">
                <Form
                  name="registration-form"
                  layout="vertical"
                  onFinish={onFinishReg}
                >
                  <div className="form-content">
                    <div className="form-row">
                      <div className="form-inner">
                        <Form.Item
                          label="First Name"
                          name="firstName"
                          rules={[
                            {
                              required: true,
                              message: "Please input your first name!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <div className="form-inner">
                        <Form.Item
                          label="Last Name"
                          name="lastName"
                          rules={[
                            {
                              required: true,
                              message: "Please input your last name!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <Form.Item
                      label="Email Address"
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not a valid email address!",
                        },
                        {
                          required: true,
                          message: "Please input your email address!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="CDC ID"
                      name="cdc"
                      rules={[
                        {
                          required: true,
                          message: "Please input your street address!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="form-footer">
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </div>
          </div>

          <div className="line" />

          <div className="section">
            <div className="left">
              <div className="title">
                <span>Password & Security</span>
                <span style={{ color: "red" }}> *</span>
              </div>
              <div className="desc">
                <span>
                  Ensure your account stays secure with password management and
                  security settings.
                </span>
              </div>
            </div>

            <div className="right">
              <div className="form-container">
                <Form
                  name="password-form"
                  layout="vertical"
                  onFinish={onFinishPass}
                >
                  <div className="form-content">
                    <div className="form-heading">
                      <span>Change Your Password</span>
                    </div>

                    <Form.Item
                      label="Password"
                      name="passworn"
                      rules={[
                        {
                          type: "password",
                          message: "The input is not a valid password!",
                        },
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Confirm Passwrd"
                      name="confirmPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="form-footer">
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </div>
          </div>

          <div className="line" />
        </div>
      ),
    },
    {
      key: 2,
      tabName: "Organization",
      body: (
        <div className="tab-page">
          <div className="section">
            <div className="left">
              <div className="title">
                <span>Organization Information</span>
                <span style={{ color: "red" }}> *</span>
              </div>
              <div className="desc">
                <span>
                  Maintain accurate company details for personalized features.
                </span>
              </div>
            </div>

            <div className="right">
              <div className="form-container">
                <Form
                  name="organization-form"
                  layout="vertical"
                  onFinish={onFinishOrg}
                >
                  <div className="form-content">
                    <Form.Item label="" name="logo">
                      <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                          <img src={uploadLogo} alt="xyz" />
                        </p>
                        <div>
                          <span className="ant-upload-text">
                            Upload Company's Daily Trade Report{" "}
                          </span>
                          <span className="ant-upload-hint">
                            or drag and drop
                          </span>
                        </div>
                        <div>
                          <span className="ant-upload-hint">PDF up to 1MB</span>
                        </div>
                      </Dragger>
                    </Form.Item>

                    <Form.Item
                      label="User Id"
                      name="userId"
                      rules={[
                        {
                          required: true,
                          message: "Please input your KVK!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <div className="form-row">
                      <div className="form-inner">
                        <Form.Item
                          label="Company Name"
                          name="companyName"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Company Name!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>

                    <Form.Item
                      label="CDC ID"
                      name="cdcId"
                      rules={[
                        {
                          required: true,
                          message: "Please input your street address!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="form-footer">
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Button
                        style={{ color: "white", backgroundColor: "black" }}
                        htmlType="submit"
                      >
                        Save
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="settings">
      <div className="page-container">
        <div className="page-title">
          <span>Settings</span>
        </div>

        <Tabs defaultActiveKey="1" size={size} style={{ marginBottom: 32 }}>
          {pageData.map((item) => (
            <Tabs.TabPane key={item.key} tab={item.tabName}>
              {item.body}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default UserSettings;
