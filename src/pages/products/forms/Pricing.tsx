import { Card, Col, Row, Space, Typography, Form, InputNumber } from "antd";
import { Category } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { getCategorie } from "../../../http/api";

type PricingProps = {
  selectedCategory: string;
};

const Pricing = ({ selectedCategory }: PricingProps) => {
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
    <Card
      title={<Typography.Text>Product Price</Typography.Text>}
      bordered={false}
    >
      {Object.entries(fetchCategory?.priceConfiguration).map(([key, value]) => {
        return (
          <div key={key}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Typography.Text>{`${key} (${value.priceType})`}</Typography.Text>

              <Row gutter={20}>
                {value.availableOptions.map((option: string) => {
                  return (
                    <Col span={8} key={option}>
                      <Form.Item
                        label={option}
                        name={[
                          "priceConfiguration",
                          JSON.stringify({
                            key: key,
                            priceType: value.priceType,
                          }),
                          option,
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          placeholder={`Enter ${option}`}
                          addonAfter="INR"
                        />
                      </Form.Item>
                    </Col>
                  );
                })}
              </Row>
            </Space>
          </div>
        );
      })}
    </Card>
  );
};

export default Pricing;
