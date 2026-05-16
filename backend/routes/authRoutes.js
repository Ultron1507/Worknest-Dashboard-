const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  resetPasswordForDevelopment,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

if (process.env.NODE_ENV !== "production") {
  router.post("/dev-reset-password", resetPasswordForDevelopment);
}

module.exports = router;
