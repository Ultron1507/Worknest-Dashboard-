const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getProjects, createProject, updateProject, deleteProject } = require("../controllers/projectController");

// Get all projects
router.get("/", protect, getProjects);

// Create project
router.post("/", protect, createProject);

// Update project
router.put("/:id", protect, updateProject);

// Delete project
router.delete("/:id", protect, deleteProject);

module.exports = router;
