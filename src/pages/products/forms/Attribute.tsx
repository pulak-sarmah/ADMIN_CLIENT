import { Card, Col, Form, Radio, Row, Switch, Typography } from "antd";
import { Category } from "../../../types";

type AttributeProps = {
  selectedCategory: string;
};

const Attribute = ({ selectedCategory }: AttributeProps) => {
  const category: Category | null = selectedCategory
    ? JSON.parse(selectedCategory)
    : null;

  if (!category) {
    return null;
  }
  return (
    <Card title={<Typography.Text>Attribute</Typography.Text>} bordered={false}>
      {category?.attributes.map((attribute) => {
        return (
          <div key={attribute.name}>
            {attribute.widgetType === "radio" ? (
              <Form.Item
                label={attribute.name}
                name={["attributes", attribute.name]}
                initialValue={attribute.defaultValue}
                rules={[
                  {
                    required: true,
                    message: `Please select ${attribute.name}`,
                  },
                ]}
              >
                <Radio.Group>
                  {attribute.availableOptions.map((option: string) => {
                    return (
                      <Radio.Button value={option} key={option}>
                        {option}
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            ) : attribute.widgetType === "switch" ? (
              <Row gutter={20}>
                <Col>
                  <Form.Item
                    label={attribute.name}
                    name={["attributes", attribute.name]}
                    valuePropName="checked"
                    initialValue={attribute.defaultValue}
                  >
                    <Switch checkedChildren="Yes" unCheckedChildren="No" />
                  </Form.Item>
                </Col>
              </Row>
            ) : null}
          </div>
        );
      })}
    </Card>
  );
};

export default Attribute;
