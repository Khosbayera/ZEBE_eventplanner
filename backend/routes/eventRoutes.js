const express = require("express");
const router = express.Router();
const { planEvent } = require("../controllers/eventController");
const Venue         = require("../models/Venue");
const Catering      = require("../models/Catering");
const Entertainment = require("../models/Entertainment");

// POST /api/plan-event — generate 3 plans
router.post("/plan-event", planEvent);

// GET /api/venues
router.get("/venues", async (req, res) => {
  try {
    const venues = await Venue.find().sort({ price: 1 });
    res.json({ success: true, data: venues });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/catering
router.get("/catering", async (req, res) => {
  try {
    const catering = await Catering.find().sort({ price_per_person: 1 });
    res.json({ success: true, data: catering });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/entertainment
router.get("/entertainment", async (req, res) => {
  try {
    const entertainment = await Entertainment.find().sort({ price: 1 });
    res.json({ success: true, data: entertainment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;