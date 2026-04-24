import { useEffect, useState } from "react";
import API from "../services/api";

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

        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* 🔹 Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500">
          Welcome back {user?.id ? "User 👋" : ""}
        </p>
      </div>

      {/* 🔹 Cards */}
      <div className="grid grid-cols-4 gap-6">
        
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Projects</h3>
          <p className="text-2xl font-bold mt-2">24</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold mt-2">152</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Completed Tasks</h3>
          <p className="text-2xl font-bold mt-2 text-green-600">98</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Active Users</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-600">32</p>
        </div>

      </div>

      {/* 🔹 Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Your Info</h2>

        {user ? (
          <div className="space-y-2">
            <p><span className="font-semibold">User ID:</span> {user.id}</p>
            <p><span className="font-semibold">Role:</span> {user.role}</p>
            <p><span className="font-semibold">Token Expiry:</span> {new Date(user.exp * 1000).toLocaleString()}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

    </div>
  );
}