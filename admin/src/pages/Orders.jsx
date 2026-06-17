import axiosInstance from "../utils/axiosInstance.js";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import handleApiError from "../utils/handleApiError.js";
import { assets } from "../assets/admin_assets/assets.js";
import { useAdminContext } from "../context/AdminContext.jsx";
import { Loader2 } from "lucide-react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currency } = useAdminContext();

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/order/list");

      setOrders(res.data.orders.reverse());
    } catch (error) {
      handleApiError(error, fetchAllOrders.name);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (e, orderId) => {
    setIsLoading(true);

    try {
      await axiosInstance.post("/order/status", {
        orderId,
        status: e.target.value,
      });

      await fetchAllOrders();
      toast.success("Status updated");
    } catch (error) {
      handleApiError(error, handleUpdateOrderStatus.name);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h3 className="mb-2">Orders</h3>
      <div className="space-y-2">
        {isLoading ? (
          <div className="border rounded-md p-12 flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="border rounded-md p-12 text-center">
            <p className="text-lg font-medium">No orders yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Customer orders will appear here once they start placing them.
            </p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 rounded-md p-5 md:p-8 text-xs md:text-sm text-gray-700"
            >
              <img
                className="w-12"
                src={assets.parcel_icon}
                alt="parcel-icon"
              />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p className="py-0.5" key={index}>
                          {item.name} x {item.quantity} <span>{item.size}</span>
                        </p>
                      );
                    } else {
                      return (
                        <p className="py-0.5" key={index}>
                          {item.name} x {item.quantity}{" "}
                          <span>{item.size},</span>
                        </p>
                      );
                    }
                  })}
                </div>
                <p className="mt-3 mb-2 font-medium">{`${order.address.firstName} ${order.address.lastName}`}</p>
                <div>
                  <p>{`${order.address.street},`}</p>
                  <p>
                    {`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>

              <div>
                <p className="text-sm sm:text-[15px]">
                  Items: {order.items.length}
                </p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              <p className="text-sm sm:text-[15px]">
                {currency}
                {order.amount}
              </p>

              <select
                value={order.status}
                onChange={(e) => handleUpdateOrderStatus(e, order._id)}
                disabled={isLoading}
                className="p-2 font-semibold justify-self-start"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Order;
