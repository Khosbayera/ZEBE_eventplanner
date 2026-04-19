const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const eventRoutes = require("./routes/eventRoutes");
const errorHandler = require("./middleware/errorHandler");

// Load env
dotenv.config();

const app = express();

// ─── MIDDLEWARE ─────────────────────────────────────────────

app.use(express.json());

// ─── API ROUTES (ЭХЛЭЭД) ───────────────────────────────────

app.use("/api", eventRoutes);

// ─── HEALTH CHECK ──────────────────────────────────────────

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "ZEBE API running 🔥" });
});

// ─── FRONTEND SERVE (🔥 ЧУХАЛ) ─────────────────────────────

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ─── ERROR HANDLER ─────────────────────────────────────────

app.use(errorHandler);

// ─── DB + SERVER ───────────────────────────────────────────

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();