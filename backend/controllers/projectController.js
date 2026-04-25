const Project = require("../models/Project");

// GET ALL PROJECTS FOR USER
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE PROJECT
const createProject = async (req, res) => {
  const { name, description } = req.body;

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
  const { name, description } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this project" });
    }

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    project.name = name;
    project.description = description;

    await project.save();

    res.json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
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
