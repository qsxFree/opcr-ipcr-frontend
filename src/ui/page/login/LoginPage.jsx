import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Typography, Form, Input, Button, Col, Alert } from "antd";
import React from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import APP_CONFIG from "../../../data/static/config";
import Logo from "../../component/logo/Logo";
import PlainLayout from "../_base/PlainLayout";

const LoginPage = () => {
  let navigate = useNavigate();
  let { state } = useLocation();
  //let user = React.useContext(UserContext);
  let [form] = Form.useForm();
  const [loginStatus, setLoginStatus] = React.useState(null);

  //   const registerCookieMutation = useMutation(AuthenticationAPI.registerCookie, {
  //     onSuccess: (data) => {
  //       loginMutation.mutate(form.getFieldsValue());
  //     },
  //     onError: (error) => {
  //       setLoginStatus("error-cookie");
  //     },
  //   });

  //   const loginMutation = useMutation(AuthenticationAPI.login, {
  //     onSuccess: (data) => {
  //       setLoginStatus("success-login");
  //       user.set(transformUser(data.data));
  //       navigate(state?.path || "/home");
  //     },
  //     onError: (error) => {
  //       setLoginStatus("error-login");
  //     },
  //   });

  const _login = () => {
    // form.validateFields().then(() => {
    //   registerCookieMutation.mutate();
    // });

    navigate("/home");
  };

  return (
    <PlainLayout>
      <br />
      <Row justify="center">
        <Logo.Lg />
      </Row>
      <Row justify="center">
        <Typography.Title level={4}>
          {APP_CONFIG.applicationOwner.toUpperCase()}
        </Typography.Title>
      </Row>
      <Row justify="center">
        <Typography.Title level={2}>
          {APP_CONFIG.applicationName.toUpperCase()}
        </Typography.Title>
      </Row>
      <br />
      <Row justify="center">
        <Col>
          {loginStatus === "error-cookie" ? (
            <Alert
              message="Error on registiring session id"
              type="error"
              showIcon
            />
          ) : loginStatus === "error-login" ? (
            <Alert message="Invalid Login Credentials" type="error" showIcon />
          ) : null}
        </Col>
      </Row>
      <br />
      <Row justify="center">
        <Col span={6}>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              required
              rules={[
                { message: "Please input your user ID!", required: true },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              required
              rules={[
                { message: "Please input your password!", required: true },
              ]}
            >
              <Input.Password prefix={<KeyOutlined />} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <br />
      <Row justify="center">
        <Col>
          <Button type="primary" onClick={_login}>
            Sign in
          </Button>
        </Col>
      </Row>
    </PlainLayout>
  );
};

export default LoginPage;
