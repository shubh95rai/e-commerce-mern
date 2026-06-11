import { Navigate, Outlet } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";

const PublicRoute = () => {
  const { isAdmin } = useAdminContext();

  return isAdmin ? <Navigate to="/add" replace /> : <Outlet />;
};

export default PublicRoute;
