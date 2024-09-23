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
  Drawer,
  theme,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import ProductFilter from "./ProductFilter";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createProduct, getProducts, updateProduct } from "../../http/api";
import { useEffect, useMemo, useState } from "react";
import { PER_PAGE } from "../../constants";
import { FieldData, Product } from "../../types";
import { ColumnType } from "antd/es/table";
import { format } from "date-fns";
import { debounce } from "lodash";
import { useAuthStore } from "../../store";

import ProductFrom from "./forms/ProductFrom";
import { makeFormData } from "./helpers";

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
  const [form] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (currentProduct) {
      setDrawerOpen(true);

      const priceConfiguration = Object.entries(
        currentProduct.priceConfiguration
      ).reduce((acc, [key, value]) => {
        const stringifiedKey = JSON.stringify({
          key: key,
          priceType: value.priceType,
        });

        return {
          ...acc,
          [stringifiedKey]: value.availableOptions,
        };
      }, {});

      const attributes = currentProduct.attributes.reduce((acc, item) => {
        return {
          ...acc,
          [item.name]: item.value,
        };
      });

      console.log(priceConfiguration);

      form.setFieldsValue({
        ...currentProduct,
        attributes,
        priceConfiguration,
        categoryId: currentProduct.categoryId,
      });
    }
  }, [currentProduct, form]);

  const { user } = useAuthStore();
  const [queryParams, setQueryParams] = useState({
    limit: PER_PAGE,
    page: 1,
    tenantId:
      user!.role === "manager" ? (user?.tenant ? user.tenant.id : 0) : "",
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

  const debounceQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({
        ...prev,
        q: value,
        page: 1,
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
        page: 1,
      }));
    }
  };

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const queryClient = useQueryClient();

  const { mutate: productMutate, isPending } = useMutation({
    mutationKey: ["product"],
    mutationFn: async (data: FormData) => {
      if (currentProduct) {
        return updateProduct(data, currentProduct._id).then((res) => res.data);
      } else {
        return createProduct(data).then((res) => res.data);
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      form.resetFields();
      setDrawerOpen(false);
      return;
    },
  });

  const onHandleSubmit = async () => {
    try {
      await form.validateFields();

      const priceConfiguration = form.getFieldValue("priceConfiguration");
      const pricing = Object.entries(priceConfiguration).reduce(
        (acc, [key, value]) => {
          const parsedKey = JSON.parse(key);

          return {
            ...acc,
            [parsedKey.key]: {
              priceType: parsedKey.priceType,
              availableOptions: value,
            },
          };
        },
        {}
      );

      const categoryId = form.getFieldValue("categoryId");

      const attributes = Object.entries(form.getFieldValue("attributes")).map(
        ([key, value]) => {
          return {
            name: key,
            value: value,
          };
        }
      );

      const postData = {
        ...form.getFieldsValue(),
        tenantId:
          user!.role === "manager"
            ? user?.tenant
              ? user.tenant.id
              : 0
            : form.getFieldValue("tenantId"),
        image: form.getFieldValue("image"),
        isPublish: form.getFieldValue("isPublish") ? true : false,
        categoryId,
        priceConfiguration: pricing,
        attributes,
      };
      const formData = makeFormData(postData);
      await productMutate(formData);
    } catch (errorInfo) {
      message.error("something went wrong");
      console.log("Failed:", errorInfo);
    }
  };
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
        </Flex>

        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <ProductFilter>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setDrawerOpen(true);
              }}
            >
              Add Products
            </Button>
          </ProductFilter>
        </Form>
        <Table
          columns={[
            ...columns,
            {
              title: "Actions",
              render: (_, record: Product) => {
                return (
                  <Space>
                    <Button
                      type="link"
                      onClick={() => {
                        setCurrentProduct(record);
                      }}
                    >
                      Edit
                    </Button>
                  </Space>
                );
              },
            },
          ]}
          dataSource={products?.data}
          rowKey={"_id"}
          pagination={{
            total: products?.total,
            pageSize: queryParams.limit,
            current: queryParams.page,
            onChange: (page) => {
              setQueryParams({
                ...queryParams,
                page: page,
              });
            },
            showTotal: (total: number, range: [number, number]) =>
              `Showing ${range[0]}-${range[1]} of ${total} items`,
          }}
        />

        <Drawer
          title={!currentProduct ? "Add Product" : "Edit Product"}
          width={720}
          destroyOnClose={true}
          open={drawerOpen}
          styles={{ body: { background: colorBgLayout } }}
          onClose={() => {
            setCurrentProduct(null);
            form.resetFields();
            setDrawerOpen(false);
          }}
          extra={
            <Space>
              <Button
                onClick={() => {
                  setCurrentProduct(null);
                  setDrawerOpen(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={onHandleSubmit}
                loading={isPending}
              >
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" form={form}>
            <ProductFrom form={form} />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Products;
