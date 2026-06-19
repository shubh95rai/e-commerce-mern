import { Route, Routes } from "react-router-dom";
import { use, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useAdminContext } from "./context/AdminContext";
import { Loader } from "lucide-react";

import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import PublicRoute from "./components/PublicRoute";
import AdminOnlyRoute from "./components/AdminOnlyRoute";
import DashboardLayout from "./components/DashboardLayout";

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster />

      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<AdminOnlyRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
export default App;
