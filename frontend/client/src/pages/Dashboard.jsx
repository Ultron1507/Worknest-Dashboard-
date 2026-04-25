import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 👇 expecting { user: { name, email, role, ... } }
        setUser(res.data.user);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 w-full">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="text-gray-500 mt-1">
            Welcome back,{" "}
            <span className="font-semibold text-indigo-600">
              {user?.name || "User"} 👋
            </span>
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-lg shadow text-sm">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* 🔥 STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Total Projects</h3>
          <p className="text-3xl font-bold mt-2">24</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Total Tasks</h3>
          <p className="text-3xl font-bold mt-2">152</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">98</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Active Users</h3>
          <p className="text-3xl font-bold mt-2 text-indigo-600">32</p>
        </div>

      </div>

      {/* 🔥 PROFILE CARD */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Your Profile</h2>

        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500">Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500">Role</p>
              <p className="font-semibold">{user.role || "User"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500">Token Expiry</p>
              <p className="font-semibold">
                {user.exp
                  ? new Date(user.exp * 1000).toLocaleString()
                  : "N/A"}
              </p>
            </div>

          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

    </div>
  );
}
