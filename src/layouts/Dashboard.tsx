import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const Dashboard = () => {
  const { user } = useAuthStore();

  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  return (
    <div>
      <h1>Dashboard Component</h1>

      <Outlet />
    </div>
  );
};

export default Dashboard;
