import { Breadcrumb, Flex, Space } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
const products = () => {
  return (
    <>
      <Space
        direction="vertical"
        size={"large"}
        style={{
          width: "100%",
        }}
      >
        <Flex justify="space-between">
          <Breadcrumb
            items={[
              { title: <Link to="/">Dashboard</Link> },
              { title: "Products" },
            ]}
            separator=<RightOutlined />
          />
        </Flex>
      </Space>
    </>
  );
};

export default products;
