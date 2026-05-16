const Project = require("../models/Project");
const { cleanString, isValidObjectId } = require("../utils/validation");

function normalizeProjectPayload(body) {
  return {
    name: cleanString(body.name, 100),
    description: cleanString(body.description, 1000),
  };
}

// GET ALL PROJECTS FOR USER
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id }).lean();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE PROJECT
const createProject = async (req, res) => {
  const { name, description } = normalizeProjectPayload(req.body);

  try {
    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await Project.create({
      name,
      description,
      userId: req.user._id,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE PROJECT
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description } = normalizeProjectPayload(req.body);

  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await Project.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { $set: { name, description } },
      { new: true, runValidators: true }
    ).lean();

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this project" });
    }

    await Project.findByIdAndDelete(id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
