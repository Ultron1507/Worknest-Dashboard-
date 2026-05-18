const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const rateLimit = require("express-rate-limit");

dotenv.config();

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "CLIENT_URL"];

if (process.env.NODE_ENV === "production") {
  const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingEnvVars.length) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
  }
}

connectDB();

const app = express();

// Rate Limiter: Prevents API abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: { message: "Too many requests, please try again later." }
});

const allowedOrigin = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.replace(/\/$/, "") 
  : "http://localhost:5173";

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/", limiter);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "Healthy",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on our end!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
