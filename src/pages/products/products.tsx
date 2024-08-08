import { Breadcrumb, Button, Flex, Space, Form } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";

import { PlusOutlined } from "@ant-design/icons";
import ProductFilter from "./ProductFilter";

const Products = () => {
  const [filterForm] = Form.useForm();
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
        <Form form={filterForm} onFieldsChange={() => {}}>
          <ProductFilter>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => {}}>
              Add Products
            </Button>
          </ProductFilter>
        </Form>
      </Space>
    </>
  );
};

export default Products;
