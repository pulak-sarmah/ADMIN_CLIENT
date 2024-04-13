import {
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  Space,
  Button,
  Alert,
} from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../../components/icons/Logo";
import { useMutation } from "@tanstack/react-query";
import { Credentials } from "../../types";
import { login } from "../../http/api";

const loginUser = async (userData: Credentials) => {
  const { data } = await login(userData);
  return data;
};

const LoginPage = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      console.log("login successful");
    },
  });

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
            <Logo />
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
            <Form
              initialValues={{ remember: true }}
              onFinish={(values) => {
                mutate({
                  email: values.username,
                  password: values.password,
                });
              }}
            >
              {isError && (
                <Alert
                  message="Invalid credential"
                  type="error"
                  showIcon
                  style={{ marginBottom: 24 }}
                />
              )}
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please provide your username!",
                  },
                  {
                    type: "email",
                    message: "Please provide a valid email address",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  type="text"
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please provide your password!",
                  },
                  {
                    pattern: new RegExp(
                      "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"
                    ),
                    message:
                      "[length: 6], [at least one letter], [at least one numbe]",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="password"
                />
              </Form.Item>

              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href={"#"}>Forgot password</a>
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={isPending}
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
