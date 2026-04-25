import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow rounded-xl">

      {/* 🔍 SEARCH */}
      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
        <i className="ri-search-line text-gray-500"></i>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none ml-2 w-full text-sm"
        />
      </div>

      {/* 🔔 RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <i className="ri-notification-3-line text-xl"></i>

          {/* red dot */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* USER */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-full text-sm font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : ""}
          </div>

          <span className="text-sm font-medium">
            {user?.name || ""}
          </span>
        </div>

      </div>
    </div>
  );
}