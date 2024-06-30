import { Card, Col, Input, Row, Select } from "antd";

type UserFilterProps = {
  onFilterChange: (fileName: string, filterValue: string) => void;
  children?: React.ReactNode;
};

const UserFilter = ({ onFilterChange, children }: UserFilterProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col>
          <Row gutter={5}>
            <Col>
              <Input.Search
                placeholder="Search"
                allowClear={true}
                onChange={(e) => onFilterChange("searchFilter", e.target.value)}
              ></Input.Search>
            </Col>
            <Col>
              <Select
                style={{ width: 100 }}
                allowClear={true}
                placeholder="Select Role"
                onChange={(selectedItem) =>
                  onFilterChange("roleFilter", selectedItem)
                }
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
                onChange={(selectedItem) =>
                  onFilterChange("statusFilter", selectedItem)
                }
              >
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  );
};

export default UserFilter;
