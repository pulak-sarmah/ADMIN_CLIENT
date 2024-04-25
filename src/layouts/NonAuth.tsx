import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store";

const NonAuth = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (user !== null) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace={true} />;
  }
  return (
    <div>
      NonAuth component
      <Outlet />
    </div>
  );
};

export default NonAuth;
