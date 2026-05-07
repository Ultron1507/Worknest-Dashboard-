import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive
        ? "bg-indigo-600"
        : "hover:bg-indigo-600"
    }`;

  return (
    <div className="w-60 h-screen bg-indigo-700 text-white p-6 flex flex-col justify-between">

      {/* 🔥 TOP */}
      <div>

        <h1 className="text-2xl font-bold mb-10">
          Worknest
        </h1>

        <nav className="space-y-2">

          <NavLink
            to="/dashboard"
            className={linkClass}
          >
            <i className="ri-dashboard-line"></i>
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            className={linkClass}
          >
            <i className="ri-folder-line"></i>
            Projects
          </NavLink>

          <NavLink
            to="/tasks"
            className={linkClass}
          >
            <i className="ri-task-line"></i>
            Tasks
          </NavLink>

          <NavLink
            to="/profile"
            className={linkClass}
          >
            <i className="ri-user-line"></i>
            Profile
          </NavLink>

          {/* 👑 ADMIN ONLY */}
          {role === "admin" && (
            <NavLink
              to="/admin/users"
              className={linkClass}
            >
              <i className="ri-group-line"></i>
              Users
            </NavLink>
          )}

        </nav>
      </div>

      {/* 🔥 LOGOUT */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-600 transition"
      >
        <i className="ri-logout-box-r-line"></i>
        Logout
      </button>

    </div>
  );
}