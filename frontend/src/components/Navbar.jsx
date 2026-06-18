import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { useEffect, useRef, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import { useUserContext } from "../context/UserContext";

const Navbar = () => {
  const { setShowSearch, getCartCount } = useShopContext();
  const { isAuth, logout, navigate } = useUserContext();

  const [visible, setVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 sm:w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt="search-icon"
          className="w-5 cursor-pointer"
          onClick={() => {
            setShowSearch((prev) => !prev);
            navigate("/collection");
          }}
        />

        <div className="group relative" ref={profileRef}>
          <img
            onClick={() => {
              isAuth ? setShowProfileMenu((prev) => !prev) : navigate("/login");
            }}
            src={assets.profile_icon}
            alt="profile-icon"
            className="w-5 cursor-pointer"
          />

          {/* Dropdown Menu */}
          {isAuth && showProfileMenu && (
            <div className="absolute right-0 pt-4 rounded z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md">
                {/* <p className="cursor-pointer hover:text-black">My Profile</p> */}
                <p
                  onClick={() => {
                    navigate("/orders");
                    setShowProfileMenu(false);
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            alt="cart-icon"
            className="w-5 min-w-5 cursor-pointer"
          />
          <p className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu-icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`fixed top-0 bottom-0 right-0 overflow-hidden bg-white transition-all duration-300 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div
          className="flex flex-col text-gray-600"
          onClick={() => {
            setVisible(false);
          }}
        >
          <div className="flex items-center gap-4 p-3 cursor-pointer">
            <img
              src={assets.dropdown_icon}
              alt="dropdown-icon"
              className="h-4 rotate-180"
            />
            <p className="cursor-pointer">Back</p>
          </div>

          <NavLink to="/" className="py-2 pl-6 border-y border-gray-400">
            HOME
          </NavLink>
          <NavLink
            to="/collection"
            className="py-2 pl-6 border-b border-gray-400"
          >
            COLLECTION
          </NavLink>
          <NavLink to="/about" className="py-2 pl-6 border-b border-gray-400">
            ABOUT
          </NavLink>
          <NavLink to="/contact" className="py-2 pl-6 border-b border-gray-400">
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
