const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  resetPasswordForDevelopment,
} = require("../controllers/authController");


// 🔥 Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/dev-reset-password", resetPasswordForDevelopment);

module.exports = router;
