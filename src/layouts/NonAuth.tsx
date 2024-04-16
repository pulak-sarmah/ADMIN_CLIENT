import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const NonAuth = () => {
  const { user } = useAuthStore();

  if (user !== null) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div>
      NonAuth component
      <Outlet />
    </div>
  );
};

export default NonAuth;
