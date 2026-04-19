import { useState } from "react";
import { CornerOrnament } from "./MongolianOrnament";

// Fallback gradients when no accent color is in the data
const ACCENT_FALLBACKS = [
  "linear-gradient(135deg, #1a0a00 0%, #3a1800 100%)",
  "linear-gradient(135deg, #0a1020 0%, #1a2240 100%)",
  "linear-gradient(135deg, #0e1614 0%, #1a2820 100%)",
  "linear-gradient(135deg, #1a1000 0%, #2e1a00 100%)",
  "linear-gradient(135deg, #200010 0%, #380020 100%)",
  "linear-gradient(135deg, #0e0020 0%, #1e0040 100%)",
];

function StarRating({ rating }) {
  // Guard: if rating is missing or invalid, show placeholder
  if (!rating || isNaN(rating)) {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ fontSize: 10, color: "#333" }}>★</span>
        ))}
        <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 4 }}>N/A</span>
      </div>
    );
  }

  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{
          fontSize: 10,
          color: i < full ? "var(--gold)" : i === full && hasHalf ? "var(--gold-dark)" : "#333",
        }}>★</span>
      ))}
      <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 4 }}>
        {Number(rating).toFixed(1)}
      </span>
    </div>
  );
}

export default function ServiceCard({ item, type, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered]   = useState(false);

  // Support both single image string and images array from MongoDB
  const imageUrl = item.images?.[0] || item.image || null;

  // Price display
  const price =
    type === "catering"
      ? `₮${(item.price_per_person || 0).toLocaleString()} / person`
      : `₮${(item.price || 0).toLocaleString()}`;

  // Sub-info line
  const subInfo =
    type === "venues"
      ? `Capacity: ${item.capacity || "—"} guests`
      : type === "catering"
      ? (item.style || []).join(" · ")
      : (item.type || "").toUpperCase();

  // Accent gradient (real data won't have this, use fallback)
  const accent = item.accent || ACCENT_FALLBACKS[index % ACCENT_FALLBACKS.length];

  // Initials for placeholder
  const initials = (item.name || "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className="luxury-card overflow-hidden relative"
      style={{
        cursor: "default",
        borderColor: hovered ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.12)",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 12px 40px rgba(212,175,55,0.1)" : "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner ornaments on hover */}
      {hovered && (
        <>
          <div style={{ position: "absolute", top: 6, left: 6, zIndex: 2 }}>
            <CornerOrnament position="tl" size={20} opacity={0.5} />
          </div>
          <div style={{ position: "absolute", top: 6, right: 6, zIndex: 2 }}>
            <CornerOrnament position="tr" size={20} opacity={0.5} />
          </div>
        </>
      )}

      {/* Image area */}
      <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={item.name}
            onError={() => setImgError(true)}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%", background: accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(212,175,55,0.3)", fontFamily: "Cinzel, serif",
            fontSize: 22, letterSpacing: "0.2em", fontWeight: 600,
          }}>
            {initials}
          </div>
        )}

        {/* Style tag */}
        {item.style?.[0] && (
          <div style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(11,11,11,0.85)", backdropFilter: "blur(4px)",
            border: "1px solid rgba(212,175,55,0.2)", borderRadius: 4,
            padding: "3px 8px",
          }}>
            <span className="font-outfit" style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.1em" }}>
              {item.style[0].toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "16px 18px 18px" }}>
        <h4 className="font-cormorant" style={{
          fontSize: 20, fontWeight: 600, color: "var(--cream)",
          letterSpacing: "0.02em", lineHeight: 1.2, marginBottom: 4,
        }}>
          {item.name}
        </h4>

        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>
          {subInfo}
        </p>

        <StarRating rating={item.rating} />

        {/* Price */}
        <div className="flex items-baseline justify-between mt-3 pt-3"
          style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}>
          <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            PRICE
          </span>
          <span className="font-cormorant" style={{ fontSize: 20, fontWeight: 600, color: "var(--gold)" }}>
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}