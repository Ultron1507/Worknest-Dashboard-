import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">

      {/* 🔥 Header */}
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-gray-500">Manage all users</p>
      </div>

      {/* 🔥 Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Last Active</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">

                {/* 🔥 USER */}
                <td className="p-4 flex items-center gap-3">

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center overflow-hidden">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      u.name?.charAt(0)
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <p className="font-semibold">{u.name}</p>
                  </div>

                </td>

                {/* Email */}
                <td>{u.email}</td>

                {/* Role */}
                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      u.role === "admin"
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      u.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {u.status || "active"}
                  </span>
                </td>

                {/* Joined */}
                <td>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>

                {/* Last Active */}
                <td>
                  {u.lastActive
                    ? new Date(u.lastActive).toLocaleString()
                    : "—"}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}