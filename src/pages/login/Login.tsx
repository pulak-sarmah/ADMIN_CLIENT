import { Card, Checkbox, Form, Input, Layout, Space, Button } from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginPage = () => {
  return (
    <>
      <Layout
        style={{ height: "100vh", display: "grid", placeItems: "center" }}
      >
        <Space direction="vertical" align="center" size="large">
          <Layout.Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              width="55"
              height="13"
              viewBox="0 0 55 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.322 4.63C11.322 5.434 11.136 6.166 10.764 6.826C10.392 7.474 9.84 7.99 9.108 8.374C8.388 8.758 7.512 8.95 6.48 8.95H4.896V13H0.9V0.256H6.48C8.04 0.256 9.234 0.652 10.062 1.444C10.902 2.236 11.322 3.298 11.322 4.63ZM6.03 5.8C6.858 5.8 7.272 5.41 7.272 4.63C7.272 3.85 6.858 3.46 6.03 3.46H4.896V5.8H6.03ZM16.5855 0.256V13H12.5895V0.256H16.5855ZM22.8182 9.814H27.9302V13H18.3902V9.994L23.4302 3.424H18.3902V0.256H27.9302V3.262L22.8182 9.814ZM34.1561 9.814H39.2681V13H29.7281V9.994L34.7681 3.424H29.7281V0.256H39.2681V3.262L34.1561 9.814ZM49.238 11.074H44.99L44.36 13H40.166L44.828 0.256H49.436L54.08 13H49.868L49.238 11.074ZM48.266 8.068L47.114 4.522L45.962 8.068H48.266Z"
                fill="#484848"
              />
            </svg>
          </Layout.Content>
          <Card
            bordered={false}
            style={{ width: 300 }}
            title={
              <Space
                style={{
                  width: "100%",
                  fontSize: 16,
                  justifyContent: "center",
                }}
              >
                <LockFilled />
                Sign in
              </Space>
            }
          >
            <Form>
              <Form.Item name="Username">
                <Input
                  prefix={<UserOutlined />}
                  type="text"
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item name="password">
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="password"
                />
              </Form.Item>

              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Form.Item name="remember">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href={"#"}>Forgot password</a>
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
