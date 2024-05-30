import { Button, Card, Col, Input, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UserFilter = () => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col>
          <Row gutter={5}>
            <Col>
              <Input.Search placeholder="Search"></Input.Search>
            </Col>
            <Col>
              <Select
                style={{ width: 100 }}
                allowClear={true}
                placeholder="Select Role"
              >
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
                <Select.Option value="customer">Customer</Select.Option>
              </Select>
            </Col>
            <Col>
              <Select
                style={{ width: 100 }}
                allowClear={true}
                placeholder="Status"
              >
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />}>
            Add User{" "}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UserFilter;
