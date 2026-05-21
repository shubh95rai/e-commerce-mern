import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

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

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

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
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
