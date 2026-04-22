const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted ✅",
    user: req.user,
  });
});

// Admin route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin 🚀",
  });
});

module.exports = router;