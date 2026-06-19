import { useSearchParams } from "react-router-dom";
import { useShopContext } from "../context/ShopContext.jsx";
import { useEffect } from "react";
import handleApiError from "../utils/handleApiError.js";
import axiosInstance from "../utils/axiosInstance.js";
import { toast } from "react-hot-toast";

const Verify = () => {
  const { navigate, setCartItems } = useShopContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const verifyPayment = async () => {
    try {
      const res = await axiosInstance.post("/order/verify-stripe", {
        sessionId,
      });

      if (res.data.success) {
        setCartItems({});
        navigate("/orders");
        toast.success("Order placed successfully");
      } else {
        navigate("/cart");
        toast.error("Order not placed successfully");
      }
    } catch (error) {
      handleApiError(error, "verifyPayment");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  return <div></div>;
};
export default Verify;
