import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <hr />

      <div className="flex w-full">
        <Sidebar />

        <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default DashboardLayout;
