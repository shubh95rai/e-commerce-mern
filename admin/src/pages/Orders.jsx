import axiosInstance from "../utils/axiosInstance.js";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/order/list");

      setOrders(res.data.orders);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in fetchAllOrders:", message);

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return <div></div>;
};
export default Order;
