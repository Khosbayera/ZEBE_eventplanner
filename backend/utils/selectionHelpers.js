/**
 * Three selection strategies:
 *   "budget"   → cheapest style-matching option within budget
 *   "balanced" → closest price to the allocated budget (best value)
 *   "premium"  → most expensive style-matching option within budget
 */

const styleScore = (serviceStyles = [], requestedStyle = "") => {
  if (!requestedStyle || serviceStyles.length === 0) return 0;
  const normalized = requestedStyle.toLowerCase();
  return serviceStyles.some((s) => s.toLowerCase() === normalized) ? 1 : 0;
};

const sortByStrategy = (a, b, aPrice, bPrice, budget, style, strategy) => {
  // Style match always wins first
  const styleDiff = styleScore(b.style, style) - styleScore(a.style, style);
  if (styleDiff !== 0) return styleDiff;

  if (strategy === "budget")  return aPrice - bPrice;           // cheapest first
  if (strategy === "premium") return bPrice - aPrice;           // most expensive first
  return Math.abs(budget - aPrice) - Math.abs(budget - bPrice); // balanced: closest to budget
};

const selectBestVenue = (venues, budget, style, strategy = "balanced") => {
  const affordable = venues.filter((v) => v.price <= budget);
  if (affordable.length === 0) return null;
  return affordable.sort((a, b) =>
    sortByStrategy(a, b, a.price, b.price, budget, style, strategy)
  )[0];
};

const selectBestCatering = (caterings, budget, guests, style, strategy = "balanced") => {
  const affordable = caterings.filter((c) => c.price_per_person * guests <= budget);
  if (affordable.length === 0) return null;
  return affordable.sort((a, b) =>
    sortByStrategy(
      a, b,
      a.price_per_person * guests,
      b.price_per_person * guests,
      budget, style, strategy
    )
  )[0];
};

const selectBestEntertainment = (entertainments, budget, style, allowedTypes, strategy = "balanced") => {
  const filtered = entertainments.filter(
    (e) =>
      e.price <= budget &&
      allowedTypes.map((t) => t.toLowerCase()).includes(e.type.toLowerCase())
  );
  if (filtered.length === 0) return null;
  return filtered.sort((a, b) =>
    sortByStrategy(a, b, a.price, b.price, budget, style, strategy)
  )[0];
};

module.exports = { selectBestVenue, selectBestCatering, selectBestEntertainment };