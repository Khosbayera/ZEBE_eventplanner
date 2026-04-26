import { useState, useEffect } from "react";
import axios from "axios";
import { MongolianDivider, OrnamentDot } from "./MongolianOrnament";

function EmptyState() {
  return (
    <div
      className="text-center fade-up"
      style={{ padding: "80px 24px" }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          border: "1px solid rgba(212,175,55,0.2)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          fontSize: 24,
          color: "rgba(212,175,55,0.3)",
        }}
      >
        ◈
      </div>
      <p
        className="font-cormorant"
        style={{ fontSize: 22, color: "var(--text-muted)", letterSpacing: "0.02em" }}
      >
        No saved plans yet
      </p>
      <p
        className="font-outfit mt-2"
        style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}
      >
        Generate a plan and click "Save This Plan" to see it here.
      </p>
    </div>
  );
}

function PlanRow({ saved, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const summary = saved.event_summary || {};
  const plans = Array.isArray(saved.plans) ? saved.plans : [];
  const date = new Date(saved.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(saved._id);
    setDeleting(false);
  };

  return (
    <div
      className="luxury-card fade-up"
      style={{
        marginBottom: 16,
        border: "1px solid rgba(212,175,55,0.15)",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      {/* Row header — always visible */}
      <div
        style={{
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          cursor: "pointer",
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Event type badge */}
        <div
          style={{
            width: 44,
            height: 44,
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
            background: "rgba(212,175,55,0.04)",
          }}
        >
          {summary.eventType === "wedding" ? "💍" : summary.eventType === "corporate" ? "🏢" : "🎂"}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-cormorant"
              style={{ fontSize: 18, color: "var(--cream)", fontWeight: 600, textTransform: "capitalize" }}
            >
              {summary.eventType || "Event"} · {summary.style || ""}
            </span>
            <span
              className="font-cinzel"
              style={{
                fontSize: 9,
                letterSpacing: "0.15em",
                color: "var(--gold)",
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.2)",
                padding: "2px 8px",
                borderRadius: 4,
                textTransform: "uppercase",
              }}
            >
              {summary.guests} guests
            </span>
          </div>
          <p
            className="font-outfit"
            style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
          >
            ₮{(summary.requested_budget || 0).toLocaleString()} budget · Saved {date}
          </p>
        </div>

        {/* Right side: expand + delete */}
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              background: "none",
              border: "1px solid rgba(220,60,60,0.2)",
              color: "rgba(220,60,60,0.5)",
              borderRadius: 6,
              padding: "5px 12px",
              fontSize: 11,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(220,60,60,0.5)";
              e.currentTarget.style.color = "#e08080";
              e.currentTarget.style.background = "rgba(220,60,60,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(220,60,60,0.2)";
              e.currentTarget.style.color = "rgba(220,60,60,0.5)";
              e.currentTarget.style.background = "none";
            }}
          >
            {deleting ? "..." : "Delete"}
          </button>

          <span
            style={{
              fontSize: 18,
              color: "rgba(212,175,55,0.4)",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => setExpanded((v) => !v)}
          >
            ⌄
          </span>
        </div>
      </div>

      {/* Expanded plan details */}
      {expanded && (
        <div
          style={{
            borderTop: "1px solid rgba(212,175,55,0.08)",
            padding: "20px 24px",
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.type}
              style={{
                background: "rgba(212,175,55,0.03)",
                border: "1px solid rgba(212,175,55,0.1)",
                borderRadius: 8,
                padding: "14px 16px",
              }}
            >
              <p
                className="font-cinzel"
                style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--gold)", marginBottom: 10 }}
              >
                {plan.type?.toUpperCase()}
              </p>

              {["venue", "catering", "entertainment"].map((key) => (
                <div key={key} style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {key}:{" "}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--cream)" }}>
                    {plan[key]?.name || "—"}
                  </span>
                </div>
              ))}

              <div
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTop: "1px solid rgba(212,175,55,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>TOTAL</span>
                <span
                  className="font-cormorant"
                  style={{ fontSize: 18, color: "var(--gold)", fontWeight: 600 }}
                >
                  ₮{(plan.total_cost || 0).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SavedPlansSection({ token }) {
  const [savedPlans, setSavedPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await axios.get("/api/plans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) setSavedPlans(data.data);
      } catch (err) {
        setError("Could not load saved plans.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedPlans((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Could not delete plan. Try again.");
    }
  };

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="section-line mb-4">
          <span
            className="font-cinzel"
            style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--text-muted)" }}
          >
            YOUR ACCOUNT
          </span>
        </div>
        <h2
          className="font-cormorant"
          style={{ fontSize: 48, fontWeight: 600, color: "var(--cream)", letterSpacing: "0.02em", lineHeight: 1 }}
        >
          Saved Plans
        </h2>
        <p
          className="font-outfit mt-3"
          style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 400, margin: "12px auto 0" }}
        >
          All your saved event plans in one place. Click a row to expand the details.
        </p>
      </div>

      <MongolianDivider />

      <div style={{ maxWidth: 860, margin: "40px auto 0" }}>
        {loading && (
          <div className="flex flex-col items-center gap-4 mt-16">
            <div className="spinner" />
            <p className="font-cormorant" style={{ fontSize: 16, color: "var(--text-muted)" }}>
              Loading your plans...
            </p>
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: 8,
              background: "rgba(220,60,60,0.08)",
              border: "1px solid rgba(220,60,60,0.25)",
              color: "#e08080",
              fontSize: 13,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && savedPlans.length === 0 && <EmptyState />}

        {!loading && savedPlans.map((plan) => (
          <PlanRow key={plan._id} saved={plan} onDelete={handleDelete} />
        ))}
      </div>
    </section>
  );
}