import {
  Breadcrumb,
  Button,
  Flex,
  Space,
  Form,
  Table,
  Image,
  Tag,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";

import { PlusOutlined } from "@ant-design/icons";
import ProductFilter from "./ProductFilter";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts } from "../../http/api";
import { useState } from "react";
import { PER_PAGE } from "../../constants";
import { Product } from "../../types";
import { ColumnType } from "antd/es/table";
import { format } from "date-fns";

const columns: ColumnType<Product>[] = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    render: (_text: string, record: Product) => {
      return (
        <div>
          <Space>
            <Image
              src={record.image}
              alt={record.name}
              style={{ width: 50, height: 50 }}
              preview={true}
            />
            <div>{record.name}</div>
          </Space>
        </div>
      );
    },
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "isPublish",
    key: "isPublish",
    render: (_: boolean, record: Product) => {
      return (
        <>
          {record.isPublish ? (
            <Tag color="green">Published</Tag>
          ) : (
            <Tag color="red">Draft</Tag>
          )}
        </>
      );
    },
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => {
      return (
        <Typography.Text type="secondary">
          {format(new Date(text), "dd/MM/yyyy HH:mm")}
        </Typography.Text>
      );
    },
  },
];

const Products = () => {
  const [filterForm] = Form.useForm();
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const {
    data: products,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: async () => {
      const filterParams = Object.fromEntries(
        Object.entries(queryParams).filter(
          (item) => item[1] !== undefined && item[1] !== null
        )
      );
      const queryString = new URLSearchParams(
        filterParams as unknown as Record<string, string>
      ).toString();

      return getProducts(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  console.log(products);
  return (
    <>
      <Space
        direction="vertical"
        size={"large"}
        style={{
          width: "100%",
        }}
      >
        <Flex justify="space-between">
          <Breadcrumb
            items={[
              { title: <Link to="/">Dashboard</Link> },
              { title: "Products" },
            ]}
            separator=<RightOutlined />
          />
        </Flex>
        <Form form={filterForm} onFieldsChange={() => {}}>
          <ProductFilter>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => {}}>
              Add Products
            </Button>
          </ProductFilter>
        </Form>
        <Table
          columns={[
            ...columns,
            {
              title: "Actions",
              render: () => {
                return (
                  <Space>
                    <Button type="link" onClick={() => {}}>
                      Edit
                    </Button>
                  </Space>
                );
              },
            },
          ]}
          dataSource={products?.data}
          rowKey={"id"}
          pagination={{
            total: products?.total,
            pageSize: queryParams.perPage,
            current: queryParams.currentPage,
            onChange: (page) => {
              setQueryParams({
                ...queryParams,
                currentPage: page,
              });
            },
            showTotal: (total: number, range: [number, number]) =>
              `Showing ${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Space>
    </>
  );
};

export default Products;
