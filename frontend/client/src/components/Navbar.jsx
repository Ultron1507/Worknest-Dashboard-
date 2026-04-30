import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await API.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileUser(res.data.user);
      } catch (error) {
        console.error("Failed to load navbar user", error);
      }
    };

    fetchUser();
  }, []);

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
        <Link
          to="/profile"
          className="flex items-center hover:bg-gray-100 px-2 py-1 rounded-full transition"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
            {profileUser?.profileImage ? (
              <img
                src={`http://localhost:5000${profileUser.profileImage}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              profileUser?.name ? profileUser.name.charAt(0).toUpperCase() : user?.name ? user.name.charAt(0).toUpperCase() : ""
            )}
          </div>
        </Link>

      </div>
    </div>
  );
}