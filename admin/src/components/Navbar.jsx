import { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import { useAdminContext } from "../context/AdminContext";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const Navbar = () => {
  const { logout, isLoggingOut } = useAdminContext();

  return (
    <div className="flex items-center justify-between py-2 px-[4%]">
      <img src={assets.logo} alt="logo" className="w-[max(10%,80px)]" />
      <button
        onClick={logout}
        className="bg-gray-600 text-white px-4 py-2 w-20  rounded-full text-xs sm:text-sm"
      >
        {isLoggingOut ? (
          <Loader2 className="size-5 animate-spin mx-auto" />
        ) : (
          "Logout"
        )}
      </button>
    </div>
  );
};

export default Navbar;
