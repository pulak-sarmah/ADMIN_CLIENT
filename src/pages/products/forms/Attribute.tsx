import { Card, Col, Form, Radio, Row, Switch, Typography } from "antd";
import { Category } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { getCategorie } from "../../../http/api";

type AttributeProps = {
  selectedCategory: string;
};

const Attribute = ({ selectedCategory }: AttributeProps) => {
  const { data: fetchCategory } = useQuery<Category>({
    queryKey: ["category", selectedCategory],
    queryFn: async () => {
      return getCategorie(selectedCategory).then((res) => res.data);
    },
    staleTime: 1000 * 60 * 5,
  });

  if (!fetchCategory) {
    return null;
  }
  return (
    <Card title={<Typography.Text>Attribute</Typography.Text>} bordered={false}>
      {fetchCategory?.attributes.map((attribute) => {
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
