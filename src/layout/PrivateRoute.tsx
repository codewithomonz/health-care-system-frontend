import { useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/features/store";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function PrivateRoute() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen overflow-hidden  mx-auto drop-shadow-2xl relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-200 transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex`}
      >
        <Sidebar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-20 bg-white">
          <div className=" mx-auto md:pl-64">
            <Navbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 mt-12 bg-gray-200 overflow-y-auto">
          <div className=" mx-auto p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
