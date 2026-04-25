import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">

      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
}