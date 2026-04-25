import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 🔄 FETCH
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await API.get("/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ➕ ADD / ✏️ UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editingId) {
        await API.put(`/projects/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Project updated");
      } else {
        await API.post("/projects", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Project created");
      }

      setForm({ name: "", description: "" });
      setEditingId(null);
      setShowModal(false);
      fetchProjects();

    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    try {
      setLoading(true);

      await API.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Project deleted");
      fetchProjects();

    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ EDIT
  const handleEdit = (p) => {
    setForm({ name: p.name, description: p.description });
    setEditingId(p._id);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Project
        </button>
      </div>

      {/* 🔄 LOADING */}
      {loading && (
        <div className="text-center text-gray-500">Loading...</div>
      )}

      {/* 📦 PROJECTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg"
          >
            <h2 className="font-bold">{p.name}</h2>
            <p className="text-gray-500 text-sm mt-2">
              {p.description}
            </p>

            <div className="flex gap-4 mt-4 text-sm">
              <button
                onClick={() => handleEdit(p)}
                className="text-indigo-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="font-bold mb-4">
              {editingId ? "Edit Project" : "Add Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-2">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border px-3 py-1 rounded"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}