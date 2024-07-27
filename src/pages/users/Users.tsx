import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Space,
  Table,
  theme,
  Form,
} from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createUser, getUsers, updateUser } from "../../http/api";
import { LoadingOutlined } from "@ant-design/icons";
import { FieldData, User } from "../../types";
import { ColumnsType } from "antd/es/table";
import { useAuthStore } from "../../store";
import UserFilter from "./UserFilter";
import { useEffect, useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import UserForm from "./forms/UserForm";
import { PER_PAGE } from "../../constants";
import { debounce } from "lodash";

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
  {
    title: "Restaurant",
    dataIndex: "tenant",
    key: "tenant",
    render: (_text: string, record: User) => {
      return <div>{record.tenant?.name}</div>;
    },
  },
];

const Users = () => {
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [currentEditingUser, setCurrentEditingUser] = useState<User | null>(
    null
  );

  const queryClient = useQueryClient();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (currentEditingUser) {
      setDrawerOpen(true);
      form.setFieldsValue({
        ...currentEditingUser,
        tenantId: currentEditingUser.tenant?.id,
      });
    }
  }, [currentEditingUser, form]);

  const { user } = useAuthStore();

  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: User) => createUser(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      return;
    },
  });

  const { mutate: updateUserMutation } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (data: User) =>
      updateUser(data, currentEditingUser!.id).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      return;
    },
  });

  const {
    data: users,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: async () => {
      const filterParams = Object.fromEntries(
        Object.entries(queryParams).filter(
          (item) => item[1] !== undefined && item[1] !== null
        )
      );
      const queryString = new URLSearchParams(
        filterParams as unknown as Record<string, string>
      ).toString();

      return getUsers(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const onHandleSubmit = async () => {
    const isEditMode = !!currentEditingUser;
    console.log("isEditMode", isEditMode);
    await form.validateFields();
    if (isEditMode) {
      console.log("updateUserMutation", form.getFieldsValue());
      await updateUserMutation(form.getFieldsValue());
    } else {
      console.log("userMutate", form.getFieldsValue());
      await userMutate(form.getFieldsValue());
    }

    form.resetFields();
    setCurrentEditingUser(null);
    setDrawerOpen(false);
  };
  const debounceQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({
        ...prev,
        q: value,
        currentPage: 1,
      }));
    }, 500);
  }, []);
  const onFilterChange = (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields
      .map((item) => ({
        [item.name[0]]: item.value,
      }))
      .reduce((acc, item) => ({ ...acc, ...item }), {});

    if ("q" in changedFilterFields) {
      debounceQUpdate(changedFilterFields.q);
    } else {
      setQueryParams((prev) => ({
        ...prev,
        ...changedFilterFields,
        currentPage: 1,
      }));
    }
  };
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
        {isFetching && (
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
        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <UserFilter>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setDrawerOpen(true)}
            >
              Add User
            </Button>
          </UserFilter>
        </Form>
        <Table
          columns={[
            ...columns,
            {
              title: "Actions",
              render: (_: string, record: User) => {
                return (
                  <Space>
                    <Button
                      type="link"
                      onClick={() => {
                        setCurrentEditingUser(record);
                      }}
                    >
                      Edit
                    </Button>
                  </Space>
                );
              },
            },
          ]}
          dataSource={users?.data}
          rowKey={"id"}
          pagination={{
            total: users?.total,
            pageSize: queryParams.perPage,
            current: queryParams.currentPage,
            onChange: (page) => {
              console.log(page);
              setQueryParams({
                ...queryParams,
                currentPage: page,
              });
            },
            showTotal: (total: number, range: [number, number]) =>
              `Showing ${range[0]}-${range[1]} of ${total} items`,
          }}
        />
        <Drawer
          title={currentEditingUser ? "Edit User" : "Add User"}
          width={720}
          destroyOnClose={true}
          open={drawerOpen}
          styles={{ body: { background: colorBgLayout } }}
          onClose={() => {
            form.resetFields();
            setCurrentEditingUser(null);
            setDrawerOpen(false);
          }}
          extra={
            <Space>
              <Button
                onClick={() => {
                  setDrawerOpen(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={onHandleSubmit}>
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" form={form}>
            <UserForm isEditMode={!!currentEditingUser} />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
