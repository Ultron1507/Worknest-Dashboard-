const mongoose = require("mongoose");
const Project = require("../models/Project");
const Task = require("../models/Task");

const allowedStatuses = ["todo", "in-progress", "done"];
const allowedPriorities = ["low", "medium", "high"];

async function assertUserProject(projectId, userId) {
  if (!projectId) {
    return null;
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    const error = new Error("Invalid project");
    error.statusCode = 400;
    throw error;
  }

  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project._id;
}

function normalizeTaskPayload(body) {
  return {
    title: body.title?.trim(),
    description: body.description?.trim() || "",
    status: body.status || "todo",
    priority: body.priority || "medium",
    dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
    projectId: body.projectId || undefined,
  };
}

function validateTaskPayload(payload) {
  if (!payload.title) {
    return "Task title is required";
  }

  if (!allowedStatuses.includes(payload.status)) {
    return "Invalid task status";
  }

  if (!allowedPriorities.includes(payload.priority)) {
    return "Invalid task priority";
  }

  if (payload.dueDate && Number.isNaN(payload.dueDate.getTime())) {
    return "Invalid due date";
  }

  return null;
}

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id })
      .populate("projectId", "name")
      .sort({ createdAt: -1 })
      .lean();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createTask = async (req, res) => {
  try {
    const payload = normalizeTaskPayload(req.body);
    const validationMessage = validateTaskPayload(payload);

    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const projectId = await assertUserProject(payload.projectId, req.user._id);
    const task = await Task.create({
      ...payload,
      projectId,
      userId: req.user._id,
    });

    const populatedTask = await task.populate("projectId", "name");

    res.status(201).json({
      message: "Task created successfully",
      task: populatedTask,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.statusCode ? error.message : "Server error" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    const payload = normalizeTaskPayload(req.body);
    const validationMessage = validateTaskPayload(payload);

    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    task.title = payload.title;
    task.description = payload.description;
    task.status = payload.status;
    task.priority = payload.priority;
    task.dueDate = payload.dueDate;
    task.projectId = await assertUserProject(payload.projectId, req.user._id);

    await task.save();
    const populatedTask = await task.populate("projectId", "name");

    res.json({ message: "Task updated successfully", task: populatedTask });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.statusCode ? error.message : "Server error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
