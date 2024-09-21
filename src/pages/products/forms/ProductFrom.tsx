import {
  Row,
  Col,
  Space,
  Card,
  Input,
  Select,
  Form,
  Upload,
  Typography,
  Switch,
} from "antd";
import { Category, Tenant } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { getcategories, getTenants } from "../../../http/api";
import { PlusOutlined } from "@ant-design/icons";
import Pricing from "./Pricing";
import Attribute from "./Attribute";

const ProductFrom = () => {
  const selectedCategory = Form.useWatch("categoryId");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return getcategories();
    },
  });

  const { data: tenants } = useQuery({
    queryKey: ["restaurant"],
    queryFn: () => {
      return getTenants(`perPage=100%currentPage=1`);
    },
  });
  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size={"large"}>
          <Card title="Product Info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Product Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Product Name is required",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="categoryId"
                  rules={[
                    {
                      required: true,
                      message: "Category is required",
                    },
                  ]}
                >
                  <Select
                    style={{ width: "100%" }}
                    allowClear={true}
                    onChange={() => {}}
                    placeholder="Select a Category"
                  >
                    {categories?.data.map((category: Category) => (
                      <Select.Option
                        key={category._id}
                        value={JSON.stringify(category)}
                      >
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Description  is required",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={3}
                    maxLength={100}
                    size="large"
                    style={{ resize: "none" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Product Image" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  name="image"
                  rules={[
                    {
                      required: true,
                      message: "Product image is required",
                    },
                  ]}
                >
                  <Upload listType="picture-card">
                    <Space direction="vertical">
                      <PlusOutlined />
                      <Typography.Text>Upload</Typography.Text>
                    </Space>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Tenant Info" bordered={false}>
            <Col span={24}>
              <Form.Item
                label="Restaurent"
                name="tenantId"
                rules={[
                  {
                    required: true,
                    message: "Select a Restaurent",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  allowClear={true}
                  onChange={() => {}}
                  placeholder="Select a Restaurent"
                >
                  {tenants?.data.map((tenant: Tenant) => (
                    <Select.Option key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Card>

          {selectedCategory && <Pricing selectedCategory={selectedCategory} />}

          {selectedCategory && (
            <Attribute selectedCategory={selectedCategory} />
          )}

          <Card title="Other Properties" bordered={false}>
            <Col span={24}>
              <Space align="baseline">
                <Form.Item name={"isPublish"}>
                  <Switch
                    defaultChecked={false}
                    onChange={() => {}}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                </Form.Item>
                <Typography.Text>Published</Typography.Text>
              </Space>
            </Col>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default ProductFrom;