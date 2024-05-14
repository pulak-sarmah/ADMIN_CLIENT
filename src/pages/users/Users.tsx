import { Breadcrumb, Flex, Space, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { LoadingOutlined } from "@ant-design/icons";
import { User } from "../../types";
import { ColumnsType } from "antd/es/table";
import { useAuthStore } from "../../store";

const columns: ColumnsType<User> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (_text: string, record: User) => {
      return (
        <div>
          {record.firstName} {record.lastName}
        </div>
      );
    },
  },

  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  // {
  //   title: "Action",
  //   dataIndex: "action",
  //   key: "action",
  //   render: () => {
  //     return (
  //       <div>
  //         <Link to="/users/edit">Edit</Link>
  //       </div>
  //     );
  //   },
  // },
];

const Users = () => {
  const { user } = useAuthStore();
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return getUsers().then((res) => res.data);
    },
  });

  if (user?.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Space
        direction="vertical"
        size={"large"}
        style={{
          width: "100%",
        }}
      >
        <Breadcrumb
          items={[{ title: <Link to="/">Dashboard</Link> }, { title: "Users" }]}
          separator=<RightOutlined />
        />
        {isLoading && (
          <Flex
            justify="center"
            align="center"
            style={{
              fontSize: "2rem",
            }}
          >
            <LoadingOutlined />
          </Flex>
        )}
        {isError && (
          <Flex
            justify="center"
            align="center"
            style={{
              color: "red",
            }}
          >
            {error.message}
          </Flex>
        )}
        <Table columns={columns} dataSource={users} />
      </Space>
    </>
  );
};

export default Users;
