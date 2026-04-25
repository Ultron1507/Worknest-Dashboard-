import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive ? "bg-indigo-600" : "hover:bg-indigo-600"
    }`;

  return (
    <div className="w-55 h-screen bg-indigo-700 text-white p-6 flex flex-col justify-between">

      {/* TOP */}
      <div>
        <h1 className="text-2xl font-bold mb-10">Worknest</h1>

        <nav className="space-y-2">

          <NavLink to="/dashboard" className={linkClass}>
            <i className="ri-dashboard-line"></i>
            Dashboard
          </NavLink>

          <NavLink to="/projects" className={linkClass}>
            <i className="ri-folder-line"></i>
            Projects
          </NavLink>

          <NavLink to="/tasks" className={linkClass}>
            <i className="ri-task-line"></i>
            Tasks
          </NavLink>

          <NavLink to="/profile" className={linkClass}>
            <i className="ri-user-line"></i>
            Profile
          </NavLink>

        </nav>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 p-3 rounded-lg"
      >
        <i className="ri-logout-box-r-line"></i>
        Logout
      </button>

    </div>
  );
}