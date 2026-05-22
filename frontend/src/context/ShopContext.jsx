import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select size");
      return;
    }
    let newCartItems = structuredClone(cartItems);

    if (newCartItems[itemId]) {
      if (newCartItems[itemId][size]) {
        newCartItems[itemId][size] += 1;
      } else {
        newCartItems[itemId][size] = 1;
      }
    } else {
      newCartItems[itemId] = {};
      newCartItems[itemId][size] = 1;
    }

    setCartItems(newCartItems);
    toast.success("Product added to cart");
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        totalCount += cartItems[item][size];
      }
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let newCartItems = structuredClone(cartItems);
    newCartItems[itemId][size] = quantity;
    setCartItems(newCartItems);
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      const itemInfo = products.find((product) => product._id === item);
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          totalAmount += itemInfo.price * cartItems[item][size];
        }
      }
    }

    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
