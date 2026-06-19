import { useShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { Loader, Loader2 } from "lucide-react";

const Orders = () => {
  const { products, currency } = useShopContext();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/order/user-orders");

      let allOrdersItems = [];

      res.data.orders.map((order) => {
        order.items.map((item) => {
          item["status"] = order.status;
          item["payment"] = order.payment;
          item["paymentMethod"] = order.paymentMethod;
          item["createdAt"] = order.createdAt;
          allOrdersItems.push(item);
        });
      });

      setOrders(allOrdersItems.reverse());
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in fetchOrders:", message);

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center pt-30">
            <Loader2 className="animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <p className="text-xl font-medium text-gray-700">No orders found</p>
            <p className="text-gray-500 mt-2">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          orders.map((item, index) => (
            <div
              key={index}
              className="py-4 border-y text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={item?.image[0]?.url}
                  alt="product-img"
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.createdAt).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment:{" "}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>

                <button
                  onClick={fetchOrders}
                  className="border px-4 py-2 text-sm font-medium rounded-sm active:bg-gray-100 cursor-pointer"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Orders;
