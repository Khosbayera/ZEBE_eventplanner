const Venue = require("../models/venue");
const Catering = require("../models/catering");
const Entertainment = require("../models/entertainment");
const {
  selectBestVenue,
  selectBestCatering,
  selectBestEntertainment,
} = require("../utils/selectionHelpers");

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_ALLOCATION = { venue: 30, catering: 40, entertainment: 20 };

const ENTERTAINMENT_BY_EVENT = {
  birthday:  ["dj", "singer"],
  wedding:   ["band", "singer"],
  corporate: ["instrumental", "host"],
};

const PLAN_TIERS = [
  { type: "Budget Plan",   multiplier: 0.8, strategy: "budget" },
  { type: "Balanced Plan", multiplier: 1.0, strategy: "balanced" },
  { type: "Premium Plan",  multiplier: 1.2, strategy: "premium" },
];

// ─── Input Validation ─────────────────────────────────────────────────────────

const validateInput = ({ eventType, budget, guests, style, allocation }) => {
  if (!eventType || !budget || !guests || !style) {
    return { data: null, error: "eventType, budget, guests, and style are required." };
  }

  const normalizedEventType = eventType.toLowerCase();
  if (!ENTERTAINMENT_BY_EVENT[normalizedEventType]) {
    return {
      data: null,
      error: `Invalid eventType. Supported types: ${Object.keys(ENTERTAINMENT_BY_EVENT).join(", ")}`,
    };
  }

  if (typeof budget !== "number" || budget <= 0) {
    return { data: null, error: "budget must be a positive number." };
  }

  if (typeof guests !== "number" || guests < 1) {
    return { data: null, error: "guests must be at least 1." };
  }

  if (allocation) {
    const { venue, catering, entertainment } = allocation;
    if (
      typeof venue !== "number" ||
      typeof catering !== "number" ||
      typeof entertainment !== "number"
    ) {
      return { data: null, error: "allocation.venue, catering, and entertainment must all be numbers." };
    }
    const total = venue + catering + entertainment;
    if (total > 100) {
      return { data: null, error: `Allocation percentages add up to ${total}%. They must not exceed 100%.` };
    }
  }

  return {
    data: { eventType: normalizedEventType, budget, guests, style, allocation },
    error: null,
  };
};

// ─── Plan Builder ─────────────────────────────────────────────────────────────

const buildPlan = async ({
  type,
  multiplier,
  strategy,
  baseBudget,
  allocation,
  guests,
  style,
  eventType,
  venues,
  caterings,
  entertainments,
}) => {
  const scaledBudget = baseBudget * multiplier;

  const venueBudget         = (allocation.venue / 100) * scaledBudget;
  const cateringBudget      = (allocation.catering / 100) * scaledBudget;
  const entertainmentBudget = (allocation.entertainment / 100) * scaledBudget;

  const allowedEntertainmentTypes = ENTERTAINMENT_BY_EVENT[eventType];

  const venue = selectBestVenue(venues, venueBudget, style, strategy);
  const catering = selectBestCatering(caterings, cateringBudget, guests, style, strategy);
  const entertainment = selectBestEntertainment(
    entertainments,
    entertainmentBudget,
    style,
    allowedEntertainmentTypes,
    strategy
  );

  const venueCost         = venue ? venue.price : 0;
  const cateringCost      = catering ? catering.price_per_person * guests : 0;
  const entertainmentCost = entertainment ? entertainment.price : 0;
  const totalCost         = venueCost + cateringCost + entertainmentCost;

  return {
    type,
    venue: venue
      ? { id: venue._id, name: venue.name, price: venueCost, style: venue.style, images: venue.images }
      : null,
    catering: catering
      ? { id: catering._id, name: catering.name, price_per_person: catering.price_per_person, total_catering_cost: cateringCost, style: catering.style, images: catering.images }
      : null,
    entertainment: entertainment
      ? { id: entertainment._id, name: entertainment.name, type: entertainment.type, price: entertainmentCost, style: entertainment.style, images: entertainment.images }
      : null,
    total_cost: totalCost,
  };
};

// ─── Controller ───────────────────────────────────────────────────────────────

const planEvent = async (req, res) => {
  const { data, error } = validateInput(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const { eventType, budget, guests, style, allocation } = data;

  const finalAllocation = {
    ...DEFAULT_ALLOCATION,
    ...(allocation || {}),
  };

  const [venues, caterings, entertainments] = await Promise.all([
    Venue.find({ capacity: { $gte: guests } }),
    Catering.find(),
    Entertainment.find(),
  ]);

  if (venues.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No venues found that can accommodate ${guests} guests.`,
    });
  }

  const plans = await Promise.all(
    PLAN_TIERS.map((tier) =>
      buildPlan({
        type: tier.type,
        multiplier: tier.multiplier,
        strategy: tier.strategy,
        baseBudget: budget,
        allocation: finalAllocation,
        guests,
        style,
        eventType,
        venues,
        caterings,
        entertainments,
      })
    )
  );

  return res.status(200).json({
    success: true,
    event_summary: {
      eventType,
      guests,
      style,
      requested_budget: budget,
      allocation_used: finalAllocation,
    },
    plans,
  });
};

module.exports = { planEvent };