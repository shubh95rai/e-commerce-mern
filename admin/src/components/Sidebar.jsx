import { assets } from "../assets/admin_assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[18%] border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px] sticky top-14">
        <NavLink
          to="/add"
          className="flex items-center justify-center md:justify-start md gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <img src={assets.add_icon} alt="add-icon" className="size-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className="flex items-center justify-center md:justify-start gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <img src={assets.order_icon} alt="list-icon" className="size-5" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className="flex items-center justify-center md:justify-start gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <img src={assets.order_icon} alt="order-icon" className="size-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};
export default Sidebar;
