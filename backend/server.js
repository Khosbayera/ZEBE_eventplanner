const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const eventRoutes = require("./routes/eventRoutes");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables from .env file
dotenv.config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// Parse incoming JSON request bodies
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/api", eventRoutes);

// Health check route — useful for testing if the server is running
app.get("/", (req, res) => {
  res.json({ success: true, message: "ZEBE Event Planner API is running 🎉" });
});

// Handle requests to undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────

// Must be registered AFTER all routes
app.use(errorHandler);

// ─── Database + Server ────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 ZEBE server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

startServer();