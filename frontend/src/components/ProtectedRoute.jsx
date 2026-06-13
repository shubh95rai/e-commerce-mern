import { useUserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "lucide-react";

const ProtectedRoute = () => {
  const { isAuth, isCheckingAuth } = useUserContext();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
