const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  getProfile,
  updateProfile,
} = require("../controllers/userController");

// Protected routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Admin route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Access granted ✅",
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

// Admin route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin 🚀",
  });
});

module.exports = router;