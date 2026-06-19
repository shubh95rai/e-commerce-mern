import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAdminContext } from "../context/AdminContext";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const List = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(null);

  const { currency } = useAdminContext();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/admin/list");

      setProducts(res.data.products);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in fetchProducts:", message);

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id) => {
    setIsRemoving(id);
    try {
      await axiosInstance.post("/admin/remove", { id });

      await fetchProducts();
      toast.success("Product removed");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in removeProduct:", message);

      toast.error(message);
    } finally {
      setIsRemoving(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* ----- Desktop List Header ----- */}
        <div className="hidden md:grid grid-cols-[80px_2fr_1fr_1fr_80px] items-center py-2 px-3 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ----- List Body ----- */}
        {isLoading ? (
          <div className="border rounded-md p-12 flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="border rounded-md p-12 text-center">
            <p className="text-lg font-medium">No products yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Add your first product to get started.
            </p>
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id}>
              {/* Mobile Card */}
              <div className="flex items-center justify-between gap-3 border px-3 py-2 text-sm md:hidden">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image[0]?.url}
                    alt="product-image"
                    className="w-16 h-16 object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                    <p className="text-xs text-gray-700">
                      {currency}
                      {product.price}
                    </p>
                  </div>
                </div>

                <button
                  className="bg-gray-200 px-2 py-1 size-8 rounded-md cursor-pointer font-medium shrink-0"
                  onClick={() => removeProduct(product._id)}
                  disabled={isRemoving}
                >
                  {isRemoving === product._id ? (
                    <Loader2 className="animate-spin mx-auto size-4" />
                  ) : (
                    "X"
                  )}
                </button>
              </div>

              {/* Desktop Row */}
              <div className="hidden md:grid grid-cols-[80px_2fr_1fr_1fr_80px] items-center gap-4 border px-3 py-2 text-sm">
                <img
                  src={product.image[0]?.url}
                  alt="product-image"
                  className="w-16 h-16 object-cover"
                />
                <p>{product.name}</p>
                <p>{product.category}</p>
                <p>
                  {currency}
                  {product.price}
                </p>
                <div className="flex justify-center">
                  <button
                    className="bg-gray-200 px-2 py-1 size-8 rounded-md cursor-pointer font-medium"
                    onClick={() => removeProduct(product._id)}
                    disabled={isRemoving}
                  >
                    {isRemoving === product._id ? (
                      <Loader2 className="animate-spin mx-auto size-4" />
                    ) : (
                      "X"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
export default List;
