import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAdminContext } from "../context/AdminContext";

const AdminOnlyRoute = () => {
  const { isAdmin, isCheckingAdminAuth } = useAdminContext();

  if (isCheckingAdminAuth) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminOnlyRoute;
