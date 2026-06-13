import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAdminContext } from "../context/AdminContext";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

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
        {/* ----- List Header ----- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ----- List Body ----- */}
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="border rounded-md p-8 text-center">
            <p className="text-lg font-medium">No products yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Add your first product to get started.
            </p>
          </div>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-1 border text-sm"
            >
              <img
                src={product.image[0]?.url}
                alt="product-image"
                className="w-20 aspect-square object-cover"
              />
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>
                {currency}
                {product.price}
              </p>
              <p className="text-center">
                <button
                  className="bg-gray-200 text- px-2 py-1 size-8 rounded-md cursor-pointer font-medium"
                  onClick={() => removeProduct(product._id)}
                  disabled={isRemoving}
                >
                  {isRemoving === product._id ? (
                    <Loader2 className="animate-spin mx-auto size-4" />
                  ) : (
                    "X"
                  )}
                </button>
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};
export default List;
