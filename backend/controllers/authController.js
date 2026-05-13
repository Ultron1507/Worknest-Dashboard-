// Tools for security and data
const User = require("../models/User"); // The User blueprint/model
const bcrypt = require("bcryptjs");      // For scrambling (hashing) passwords
const jwt = require("jsonwebtoken");     // For creating "VIP Badges" (Tokens)

// Helper function: Cleans the email input
function normalizeEmail(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : email;
}

function isBcryptHash(value) {
  return typeof value === "string" && /^\$2[aby]\$\d{2}\$.{53}$/.test(value);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  return User.findOne({
    email: new RegExp(`^${escapeRegex(normalizedEmail)}$`, "i"),
  });
}

// REGISTER
// Function to create a new user (Registration)
const registerUser = async (req, res) => {
  // Get data from the frontend form
  const { name, email, password } = req.body;

  try {
    // Basic check: Are all fields filled?
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a user with this email already lives in our DB
    const normalizedEmail = normalizeEmail(email);
    const userExists = await findUserByEmail(normalizedEmail);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Scramble the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save the user record to the DB
    const user = await User.create({ name, email: normalizedEmail, password: hashedPassword });

    // Return success and a security token (login badge)
    res.status(201).json({
      message: "User registered successfully",
      token: jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" }),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN (Fixed)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let isMatch = false;

    if (isBcryptHash(user.password)) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Security Warning: This should be deprecated in production
      isMatch = password === user.password;

      if (isMatch) {
        user.password = await bcrypt.hash(password, 10);
        // Save handled below with lastActive
      }
    }

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    user.lastActive = new Date();
    await user.save();


    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPasswordForDevelopment = async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({ message: "Route not found" });
  }

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.lastActive = new Date();
    await user.save();

    res.json({
      message: "Password reset successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, resetPasswordForDevelopment };
