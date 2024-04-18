import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { Layout, Menu, theme } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ProductOutlined,
  AccountBookOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Logo from "../components/icons/Logo";
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
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = useAuthStore();

  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
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
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>Laziz Pizza ©2018</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
