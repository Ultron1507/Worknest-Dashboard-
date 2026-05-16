const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const User = require("../models/User");
const { isValidObjectId } = require("../utils/validation");

const allowedRoles = ["user", "admin"];

router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Fetch users and total count in parallel for better performance
    const [users, totalCount] = await Promise.all([
      User.find()
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(),
    ]);

    res.json({ users, totalCount });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/users/:id/role", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (id === req.user._id.toString() && role !== "admin") {
      return res.status(400).json({ message: "You cannot remove your own admin access" });
    }

    const foundUser = await User.findById(id);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    foundUser.role = role;
    await foundUser.save();

    const user = foundUser.toObject();
    delete user.password;

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
