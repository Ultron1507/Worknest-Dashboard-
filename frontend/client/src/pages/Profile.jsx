import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 🔄 Fetch user
  const fetchUser = async () => {
    try {
      const res = await API.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
      setForm({
        name: res.data.user.name,
        email: res.data.user.email,
      });
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ✏️ Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.put("/user/profile", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile updated");
      fetchUser();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-500">Manage your account details</p>
      </div>

      {/* 🔥 TOP PROFILE CARD */}
      <div className="bg-white p-6 rounded-xl shadow flex items-center gap-6">

        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        {/* Info */}
        <div>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>

          <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-600 font-medium">
            {user?.role || "User"}
          </span>
        </div>

      </div>

      {/* 🔥 PROFILE INFORMATION */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-6">
          Profile Information
        </h2>

        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Full Name */}
            <div>
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <i className="ri-user-line"></i> Full Name
              </p>
              <p className="font-semibold text-lg mt-1">
                {user.name}
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <i className="ri-mail-line"></i> Email
              </p>
              <p className="font-semibold text-lg mt-1">
                {user.email}
              </p>
            </div>

            {/* Role */}
            <div>
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <i className="ri-shield-user-line"></i> Role
              </p>
              <span className="inline-block mt-1 px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-600 font-medium">
                {user.role || "User"}
              </span>
            </div>

          </div>
        ) : (
          <p>Loading...</p>
        )}

      </div>

      {/* 🔥 EDIT PROFILE */}
      <div className="bg-white p-6 rounded-xl shadow max-w-lg">

        <h2 className="font-semibold mb-4">Edit Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Full Name"
          />

          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
          />

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

        </form>

      </div>

    </div>
  );
}