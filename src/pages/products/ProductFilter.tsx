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

type ProductFilterProps = {
  children: React.ReactNode;
};

const ProductFilter = ({ children }: ProductFilterProps) => {
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
              <Form.Item name="role">
                <Select
                  style={{ width: 100 }}
                  allowClear={true}
                  placeholder="Select Category"
                >
                  <Select.Option value="pizza">Pizza</Select.Option>
                  <Select.Option value="braverage">Braverage</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="role">
                <Select
                  style={{ width: 100 }}
                  allowClear={true}
                  placeholder="Select Restaurant"
                >
                  <Select.Option value="aa">aa</Select.Option>
                  <Select.Option value="bb">bb</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col>
              <Space>
                <Switch defaultChecked onChange={() => {}} />
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
