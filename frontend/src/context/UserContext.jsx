import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

  const checkAuth = async () => {
    setIsCheckingAuth(true);

    try {
      const res = await axiosInstance.get("/user/is-auth");

      setIsAuth(true);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in checkAuth:", message);

      setIsAuth(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      setIsAuth(true);

      toast.success("Logged in successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in login:", message);

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/user/register", {
        name,
        email,
        password,
      });

      setIsAuth(true);

      toast.success("Registered successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in register:", message);

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);

    try {
      await axiosInstance.post("/user/logout");

      setIsAuth(false);
      navigate("/login");

      toast.success("Logged out successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in logout:", message);

      toast.error(message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    isAuth,
    setIsAuth,
    isCheckingAuth,
    isLoading,
    isLoggingOut,
    login,
    register,
    logout,
    checkAuth,
    navigate,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContextProvider;
