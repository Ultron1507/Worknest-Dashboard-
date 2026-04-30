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
  const [editMode, setEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  // 🖼️ Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✏️ Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      await API.put("/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile updated");
      setImageFile(null);
      setImagePreview(null);
      fetchUser();
      setEditMode(false);
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
        <div className="relative group">
          {imagePreview || user?.profileImage ? (
            <img
              src={imagePreview || `http://localhost:5000${user.profileImage}`}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-indigo-600"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          )}
          {editMode && (
            <label className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition">
              <i className="ri-camera-line text-white text-xl"></i>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
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

      {/* 🔥 PROFILE INFORMATION AND EDIT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PROFILE INFORMATION */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              Profile Information
            </h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="p-2 hover:bg-gray-100 rounded-lg transition text-indigo-600"
              title="Edit Profile"
            >
              <i className="ri-edit-line text-xl"></i>
            </button>
          </div>

          {user ? (
            <div className="space-y-6">

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

        {/* EDIT PROFILE */}
        {editMode && (
          <div className="bg-white p-6 rounded-xl shadow">

            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold">Edit Profile</h2>
              <button
                onClick={() => {
                  setEditMode(false);
                  setImageFile(null);
                  setImagePreview(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
                title="Close"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border-2 border-dashed p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-3 w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

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
        )}

      </div>

    </div>
  );
}