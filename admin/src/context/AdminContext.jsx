import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAdminAuth, setIsCheckingAdminAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const currency = "$";

  const checkAdminAuth = async () => {
    setIsCheckingAdminAuth(true);

    try {
      await axiosInstance.get("/admin/is-auth");

      setIsAdmin(true);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in checkAdminAuth:", message);

      setIsAdmin(false);
    } finally {
      setIsCheckingAdminAuth(false);
    }
  };

  const login = async (email, password) => {
    setIsLoggingIn(true);

    try {
      const res = await axiosInstance.post("/admin/login", {
        email,
        password,
      });

      setIsAdmin(true);

      toast.success("Logged in successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in login:", message);

      toast.error(message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);

    try {
      await axiosInstance.post("/admin/logout");

      setIsAdmin(false);

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
    checkAdminAuth();
  }, []);

  const value = {
    isAdmin,
    setIsAdmin,
    isCheckingAdminAuth,
    checkAdminAuth,
    login,
    logout,
    isLoggingIn,
    isLoggingOut,
    currency,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};

export default AdminContextProvider;
