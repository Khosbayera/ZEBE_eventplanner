const mongoose = require("mongoose");

const entertainmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Entertainment name is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Entertainment type is required"],
      enum: ["dj", "singer", "band", "instrumental", "host"],
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, "Entertainment price is required"],
      min: [0, "Price cannot be negative"],
    },
    style: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entertainment", entertainmentSchema);