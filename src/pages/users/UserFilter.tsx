import { Card, Col, Form, Input, Row, Select } from "antd";

type UserFilterProps = {
  children?: React.ReactNode;
};

const UserFilter = ({ children }: UserFilterProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col>
          <Row gutter={5}>
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
                  placeholder="Select Role"
                >
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="manager">Manager</Select.Option>
                  <Select.Option value="customer">Customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col>
              <Select
                style={{ width: 100 }}
                allowClear={true}
                placeholder="Status"
                onChange={(selectedItem) =>
                  onFilterChange("statusFilter", selectedItem)
                }
              >
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Col> */}
          </Row>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  );
};

export default UserFilter;
