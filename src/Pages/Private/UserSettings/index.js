import React from "react";
import "./style.css";
import { Button, Form, Input, Tabs } from "antd";
import uploadLogo from "../../../Assets/Icons/uploadLogo.svg";
import { message, Upload } from "antd";
import { updateUser } from "../../../API/Auth";
const { Dragger } = Upload;

const UserSettings = ({ userData, setUserData }) => {
  const size = "large";

  const onFinishReg = async (values) => {
    console.log("Received values:", values);

    try {
      await updateUser(
        userData?.id,
        values?.name,
        values?.cdc_id,
        values?.email
      );

      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: userData?.id,
          name: values?.name,
          username: userData?.username,
          email: values?.email,
          cdc_id: values?.cdc_id,
          date_created: userData?.date_created,
          risk_preference: userData?.risk_preference,
        })
      );

      setUserData({
        id: userData?.id,
        name: values?.name,
        username: userData?.username,
        email: vale?.email,
        cdc_id: values?.cdc_id,
        date_created: userData?.date_created,
        risk_preference: userData?.risk_preference,
      });

      message.success("User updated successfully!");
    } catch (err) {
      console.log(err); // Set error if API call fails
    }
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

  return (
    <div className="settings">
      <div className="page-container">
        <div className="page-title">
          <span>Settings</span>
        </div>

        <Tabs defaultActiveKey="1" size={size} style={{ marginBottom: 32 }}>
          <Tabs.TabPane key={1} tab={"Account"}>
            <div className="tab-page">
              <div className="section">
                <div className="left">
                  <div className="title">
                    <span>Personal Information</span>
                    <span style={{ color: "red" }}> *</span>
                  </div>
                  <div className="desc">
                    <span>
                      Update your contact details and keep your profile
                      information current.
                    </span>
                  </div>
                </div>

                <div className="right">
                  <div className="form-container">
                    <Form
                      name="registration-form"
                      layout="vertical"
                      onFinish={onFinishReg}
                      initialValues={userData}
                    >
                      <div className="form-content">
                        <div className="form-row">
                          <div className="form-inner">
                            <Form.Item
                              label="Full Name"
                              name="name"
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
                        </div>
                        <Form.Item
                          label="Email Address"
                          name="email"
                          rules={[
                            {
                              type: "email",
                              message:
                                "The input is not a valid email address!",
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
                          name="cdc_id"
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
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane key={2} tab={"Organization"}>
            <div className="tab-page">
              <div className="section">
                <div className="left">
                  <div className="title">
                    <span>Organization Information</span>
                    <span style={{ color: "red" }}> *</span>
                  </div>
                  <div className="desc">
                    <span>
                      Maintain accurate company details for personalized
                      features.
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
                              <span className="ant-upload-hint">
                                PDF up to 1MB
                              </span>
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
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default UserSettings;
