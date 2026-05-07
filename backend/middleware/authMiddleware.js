const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {

      // 🔥 Get token
      token = req.headers.authorization.split(" ")[1];

      // 🔥 Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // 🔥 Get full user
      const user = await User.findById(decoded.id)
        .select("-password");

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      // 🔥 Optional: Block inactive users
      if (user.status === "inactive") {
        return res.status(403).json({
          message: "Account inactive",
        });
      }

      // 🔥 Save user to request
      req.user = user;

      next();

    } catch (error) {

      return res.status(401).json({
        message: "Not authorized, token failed",
      });

    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

module.exports = protect;