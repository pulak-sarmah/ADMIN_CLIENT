import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { self } from "../http/api";
import { useAuthStore } from "../store";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex } from "antd";

const getSelf = async () => {
  const { data } = await self();
  return data;
};

const Root = () => {
  const { setUser } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    retry: 1,
  });

  useEffect(() => {
    if (!data) return;
    console.log(data);
    setUser(data);
  }, [data, setUser]);

  if (isLoading) {
    return (
      <Flex
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoadingOutlined
          style={{
            fontSize: "50px",
          }}
        />
      </Flex>
    );
  }

  return <Outlet />;
};

export default Root;
