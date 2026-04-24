export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-indigo-600 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">Worknest</h1>

      <ul className="space-y-4">
        <li><i className="ri-dashboard-line mr-2"></i>Dashboard</li>
        <li><i className="ri-folder-line mr-2"></i>Projects</li>
        <li><i className="ri-task-line mr-2"></i>Tasks</li>
        <li><i className="ri-user-line mr-2"></i>Users</li>
        <li><i className="ri-settings-3-line mr-2"></i>Settings</li>
      </ul>
    </div>
  );
}