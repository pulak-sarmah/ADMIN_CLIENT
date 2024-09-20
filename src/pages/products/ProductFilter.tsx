import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import { getcategories, getTenants } from "../../http/api";
import { Category, Tenant } from "../../types";

type ProductFilterProps = {
  children: React.ReactNode;
};

const ProductFilter = ({ children }: ProductFilterProps) => {
  const { data: restaurant } = useQuery({
    queryKey: ["restaurant"],
    queryFn: () => {
      return getTenants(`perPage=100%currentPage=1`);
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return getcategories();
    },
  });

  return (
    <Card>
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={24}>
            <Col>
              <Form.Item name="q">
                <Input.Search
                  placeholder="Search"
                  allowClear={true}
                ></Input.Search>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="tenantId">
                <Select
                  style={{ width: 100 }}
                  allowClear={true}
                  placeholder="Select Category"
                >
                  {restaurant?.data.map((restaurant: Tenant) => {
                    return (
                      <Select.Option value={restaurant.id} key={restaurant.id}>
                        {restaurant.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="categoryId">
                <Select
                  style={{ width: 100 }}
                  allowClear={true}
                  placeholder="Select Category"
                >
                  {categories?.data.map((categorie: Category) => {
                    return (
                      <Select.Option value={categorie._id} key={categorie._id}>
                        {categorie.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col>
              <Space>
                <Form.Item name="isPublish">
                  <Switch defaultChecked={false} onChange={() => {}} />
                </Form.Item>
                <Typography.Text>Show Only Published</Typography.Text>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default ProductFilter;
