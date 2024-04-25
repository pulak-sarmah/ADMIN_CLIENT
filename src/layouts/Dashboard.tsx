import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ProductOutlined,
  AccountBookOutlined,
  ShopOutlined,
  BellFilled,
  DownOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Logo from "../components/icons/Logo";
import { useLogoutUser } from "../hooks/useUserlogout";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: <NavLink to="/users">Users</NavLink>,
  },
  {
    key: "/resturants",
    icon: <ShopOutlined />,
    label: <NavLink to="/resturants">Resturants</NavLink>,
  },
  {
    key: "/products",
    icon: <ProductOutlined />,
    label: <NavLink to="/products">Products</NavLink>,
  },

  {
    key: "/promos",
    icon: <AccountBookOutlined />,
    label: <NavLink to="/promos">Promos</NavLink>,
  },
];

const Dashboard = () => {
  const [, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = useAuthStore();
  const logoutUser = useLogoutUser();
  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme="light"
          collapsible={window.innerWidth > 768}
          defaultCollapsed={window.innerWidth <= 840}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            minWidth: "100px",
          }}
        >
          <div className="logo">
            <Logo />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={["/"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              background: colorBgContainer,
            }}
          >
            <Flex gap="middle" align="start" justify="space-between">
              <Badge
                text={user.role === "admin" ? "Admin" : user.tenant?.name}
                status="success"
              />

              <Space size={16}>
                <Badge dot={true}>
                  <BellFilled style={{ cursor: "pointer" }} />
                </Badge>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        label: "Logout",
                        onClick: () => logoutUser(),
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <Flex
                    align="center"
                    justify="center"
                    gap={8}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "#fde3cf",
                        color: "#f56a00",
                      }}
                    >
                      U
                    </Avatar>
                    <DownOutlined
                      style={{
                        fontSize: "10px",
                      }}
                    />
                  </Flex>
                </Dropdown>
              </Space>
            </Flex>
          </Header>
          <Content style={{ margin: "24px 24px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>Laziz Pizza ©2018</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
