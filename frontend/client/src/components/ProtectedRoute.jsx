const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

// ➕ CREATE
router.post("/", authMiddleware, async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description,
    user: req.user.id,
  });

  res.json(project);
});

// 📥 GET ALL
router.get("/", authMiddleware, async (req, res) => {
  const projects = await Project.find({ user: req.user.id });
  res.json(projects);
});

// ❌ DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


router.put("/:id", authMiddleware, async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  );

  res.json(project);
});

module.exports = router;