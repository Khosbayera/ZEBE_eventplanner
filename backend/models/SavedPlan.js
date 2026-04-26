const mongoose = require("mongoose");

const savedPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    event_summary: {
      eventType: String,
      guests: Number,
      style: String,
      requested_budget: Number,
      allocation_used: {
        venue: Number,
        catering: Number,
        entertainment: Number,
      },
    },
    // Using Mixed to avoid Mongoose misreading "type: String" as a schema directive
    plans: { type: mongoose.Schema.Types.Mixed, default: [] },
    label: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedPlan", savedPlanSchema);