const mongoose = require("mongoose");

const cateringSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Catering name is required"],
      trim: true,
    },
    price_per_person: {
      type: Number,
      required: [true, "Price per person is required"],
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

module.exports = mongoose.model("Catering", cateringSchema);