import { Outlet } from "react-router-dom";

const NonAuth = () => {
  return (
    <div>
      NonAuth component
      <Outlet />
    </div>
  );
};

export default NonAuth;
