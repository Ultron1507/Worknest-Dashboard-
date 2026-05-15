const Task = require("../models/Task");
const Project = require("../models/Project");

const allowedStatuses = ["todo", "in-progress", "done"];
const allowedPriorities = ["low", "medium", "high"];

async function assertOwnedProject(projectId, userId) {
  if (!projectId) return null;

  const project = await Project.findOne({ _id: projectId, userId });
  return project;
}

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id })
      .populate("projectId", "name")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createTask = async (req, res) => {
  const { title, description, status, priority, dueDate, projectId } = req.body;

  try {
    if (!title?.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    if (priority && !allowedPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid task priority" });
    }

    if (projectId) {
      const project = await assertOwnedProject(projectId, req.user._id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
    }

    const task = await Task.create({
      title: title.trim(),
      description,
      status,
      priority,
      dueDate: dueDate || undefined,
      projectId: projectId || undefined,
      userId: req.user._id,
    });

    const populatedTask = await task.populate("projectId", "name");
    res.status(201).json({ message: "Task created successfully", task: populatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, dueDate, projectId } = req.body;

  try {
    const task = await Task.findOne({ _id: id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!title?.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    if (priority && !allowedPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid task priority" });
    }

    if (projectId) {
      const project = await assertOwnedProject(projectId, req.user._id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
    }

    task.title = title.trim();
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.dueDate = dueDate || undefined;
    task.projectId = projectId || undefined;

    await task.save();

    const populatedTask = await task.populate("projectId", "name");
    res.json({ message: "Task updated successfully", task: populatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
