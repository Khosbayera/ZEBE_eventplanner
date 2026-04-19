const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Venue name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Venue price is required"],
      min: [0, "Price cannot be negative"],
    },
    capacity: {
      type: Number,
      required: [true, "Venue capacity is required"],
      min: [1, "Capacity must be at least 1"],
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

module.exports = mongoose.model("Venue", venueSchema);