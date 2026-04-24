export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow">
      <input
        placeholder="Search..."
        className="border px-3 py-1 rounded"
      />

      <div className="flex items-center gap-4">
        <i className="ri-notification-3-line text-xl"></i>
        <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
      </div>
    </div>
  );
}