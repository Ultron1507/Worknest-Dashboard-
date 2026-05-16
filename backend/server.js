// Import required packages
const express = require("express"); // The main web server framework
const cors = require("cors");       // Allows the frontend to communicate with the backend
const dotenv = require("dotenv");   // Loads secrets (like DB URLs) from a .env file
const connectDB = require("./config/db"); // Custom function to connect to MongoDB

// Initialize configuration
dotenv.config(); // Load the .env file

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];

if (process.env.NODE_ENV === "production") {
  const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingEnvVars.length) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
  }
}

connectDB();     // Start the database connection

const app = express();

// Middlewares: Functions that process every request before it hits the route
// CORS setup: Allows only our specific React frontend to make requests
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json()); // Parses incoming JSON data so we can use req.body
app.use("/uploads", express.static("uploads")); // Makes the 'uploads' folder public for images

// API Routes: Mapping URLs to logic
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes.js"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Health check route (to see if API is alive)
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});


// Error Handling Middleware (Best Practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on our end!" });
});

// Start the server on a specific Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
