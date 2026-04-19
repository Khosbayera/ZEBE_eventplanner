import { CornerOrnament } from "./MongolianOrnament";

const PLAN_CONFIG = {
  "Budget Plan": {
    badge: "BUDGET",
    badgeColor: "rgba(120,120,120,0.15)",
    badgeText: "#888",
    borderColor: "rgba(212,175,55,0.12)",
    labelColor: "#888",
  },
  "Balanced Plan": {
    badge: "BALANCED",
    badgeColor: "rgba(212,175,55,0.12)",
    badgeText: "#D4AF37",
    borderColor: "rgba(212,175,55,0.25)",
    labelColor: "#D4AF37",
  },
  "Premium Plan": {
    badge: "PREMIUM",
    badgeColor: "rgba(212,175,55,0.2)",
    badgeText: "#F0D060",
    borderColor: "rgba(212,175,55,0.45)",
    labelColor: "#F0D060",
    isPremium: true,
  },
};

function ServiceRow({ label, icon, data, imageUrl }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="flex items-start gap-3 py-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Image */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 8,
          flexShrink: 0,
          overflow: "hidden",
          border: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={data?.name}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            className="img-placeholder"
            style={{ width: "100%", height: "100%", fontSize: 9 }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 2 }}>
          {label.toUpperCase()}
        </p>
        <p
          className="font-cormorant"
          style={{ fontSize: 16, color: "var(--cream)", fontWeight: 600, lineHeight: 1.2 }}
        >
          {data?.name || "—"}
        </p>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
          {data
            ? label === "Catering"
              ? `₮${(data.price_per_person || 0).toLocaleString()} / person · ₮${(data.total_catering_cost || 0).toLocaleString()} total`
              : `₮${((data.price || 0)).toLocaleString()}`
            : "Not available"}
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function PlanCard({ plan, index }) {
  const config = PLAN_CONFIG[plan.type] || PLAN_CONFIG["Budget Plan"];
  const isPremium = config.isPremium;

  return (
    <div
      className={`relative luxury-card fade-up-${index + 1}`}
      style={
        isPremium
          ? {
              background: "linear-gradient(160deg, #161206 0%, #111111 60%)",
              border: `1px solid ${config.borderColor}`,
              boxShadow: "0 0 40px rgba(212,175,55,0.07), inset 0 1px 0 rgba(212,175,55,0.1)",
            }
          : {
              border: `1px solid ${config.borderColor}`,
            }
      }
    >
      {/* Corner ornaments (premium only) */}
      {isPremium && (
        <>
          <div style={{ position: "absolute", top: 8, left: 8 }}>
            <CornerOrnament position="tl" size={28} opacity={0.4} />
          </div>
          <div style={{ position: "absolute", top: 8, right: 8 }}>
            <CornerOrnament position="tr" size={28} opacity={0.4} />
          </div>
          <div style={{ position: "absolute", bottom: 8, left: 8 }}>
            <CornerOrnament position="bl" size={28} opacity={0.4} />
          </div>
          <div style={{ position: "absolute", bottom: 8, right: 8 }}>
            <CornerOrnament position="br" size={28} opacity={0.4} />
          </div>
        </>
      )}

      <div style={{ padding: "24px 20px" }}>
        {/* Plan badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-cinzel"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              padding: "4px 12px",
              borderRadius: 4,
              background: config.badgeColor,
              color: config.badgeText,
              border: `1px solid ${config.borderColor}`,
            }}
          >
            {config.badge}
          </span>

          {isPremium && (
            <span style={{ fontSize: 16 }} role="img" aria-label="star">✦</span>
          )}
        </div>

        {/* Plan name */}
        <h3
          className="font-cormorant"
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: config.labelColor,
            letterSpacing: "0.02em",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          {plan.type}
        </h3>

        {/* Service rows */}
        <div>
          <ServiceRow
            label="Venue"
            icon="▣"
            data={plan.venue}
            imageUrl={plan.venue?.images?.[0]}
          />
          <ServiceRow
            label="Catering"
            icon="◈"
            data={plan.catering}
            imageUrl={plan.catering?.images?.[0]}
          />
          <ServiceRow
            label="Entertainment"
            icon="◎"
            data={plan.entertainment}
            imageUrl={plan.entertainment?.images?.[0]}
          />
        </div>

        {/* Total cost */}
        <div
          className="flex items-baseline justify-between mt-5 pt-4"
          style={{ borderTop: `1px solid ${config.borderColor}` }}
        >
          <span
            className="font-outfit"
            style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)" }}
          >
            TOTAL COST
          </span>
          <span
            className="font-cormorant"
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: isPremium ? "#F0D060" : "var(--gold)",
              letterSpacing: "0.02em",
            }}
          >
            ₮{(plan.total_cost || 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
