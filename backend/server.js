const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const eventRoutes = require("./routes/eventRoutes");
const authRoutes  = require("./routes/authRoutes");
const planRoutes  = require("./routes/planRoutes");
const chatRoutes  = require("./routes/chatRoutes");   // ← NEW
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/chat", chatRoutes);      // ← NEW

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "ZEBE API running 🔥" });
});

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

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