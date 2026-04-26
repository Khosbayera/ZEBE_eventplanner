const express = require("express");
const router = express.Router();
const SavedPlan = require("../models/SavedPlan");
const { protect } = require("../middleware/authMiddleware");

// All routes here require authentication
router.use(protect);

// ── POST /api/plans  — save a generated plan set ─────────────────────────────
router.post("/", async (req, res) => {
  const { event_summary, plans, label } = req.body;

  if (!plans || !Array.isArray(plans) || plans.length === 0) {
    return res.status(400).json({ success: false, message: "plans array is required." });
  }

  const saved = await SavedPlan.create({
    userId: req.user.id,
    event_summary,
    plans,
    label: label || "",
  });

  return res.status(201).json({ success: true, data: saved });
});

// ── GET /api/plans  — list all saved plans for the user ──────────────────────
router.get("/", async (req, res) => {
  const savedPlans = await SavedPlan.find({ userId: req.user.id }).sort({ createdAt: -1 });
  return res.status(200).json({ success: true, data: savedPlans });
});

// ── DELETE /api/plans/:id  — remove a saved plan ─────────────────────────────
router.delete("/:id", async (req, res) => {
  const plan = await SavedPlan.findOne({ _id: req.params.id, userId: req.user.id });

  if (!plan) {
    return res.status(404).json({ success: false, message: "Plan not found." });
  }

  await plan.deleteOne();
  return res.status(200).json({ success: true, message: "Plan deleted." });
});

module.exports = router;
