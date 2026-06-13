import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Loader } from "lucide-react";

const PublicRoute = () => {
  const { isAuth, isCheckingAuth } = useUserContext();
console.log(isAuth,"isAuth")
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-120">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
