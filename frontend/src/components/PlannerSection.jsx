import { useState } from "react";
import axios from "axios";
import { EVENT_TYPES, STYLES } from "../data/mockData";
import { MongolianDivider, OrnamentDot } from "./MongolianOrnament";
import PlanCard from "./PlanCard";

const DEFAULT_ALLOCATION = { venue: 30, catering: 40, entertainment: 30 };

function Label({ children }) {
  return (
    <label
      className="font-outfit"
      style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", display: "block", marginBottom: 8 }}
    >
      {children}
    </label>
  );
}

function AllocationSlider({ label, value, onChange, color }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span style={{ fontSize: 13, color: "var(--text)" }}>{label}</span>
        <span
          className="font-outfit"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--gold)",
            background: "rgba(212,175,55,0.1)",
            padding: "2px 10px",
            borderRadius: 4,
            minWidth: 46,
            textAlign: "center",
          }}
        >
          {value}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 3,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 2,
          marginBottom: 6,
          overflow: "hidden",
        }}
      >
        <div
          className="allocation-bar"
          style={{ width: `${value}%`, height: "100%" }}
        />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default function PlannerSection() {
  const [form, setForm] = useState({
    eventType: "birthday",
    budget: "",
    guests: "",
    style: "minimal",
  });
  const [allocation, setAllocation] = useState(DEFAULT_ALLOCATION);
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = allocation.venue + allocation.catering + allocation.entertainment;
  const isValid = total === 100 && form.budget && form.guests;

  const handleGenerate = async () => {
    if (!isValid) {
      setError(
        total !== 100
          ? `Allocation totals ${total}% — must equal exactly 100%.`
          : "Please fill in all fields."
      );
      return;
    }

    setLoading(true);
    setError("");
    setPlans(null);

    try {
      const { data } = await axios.post("/api/plan-event", {
        eventType: form.eventType,
        budget: Number(form.budget),
        guests: Number(form.guests),
        style: form.style,
        allocation,
      });

      if (data.success) {
        setPlans(data.plans);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Cannot connect to server. Make sure your backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
      {/* Section header */}
      <div className="text-center mb-12">
        <div className="section-line mb-4">
          <span
            className="font-cinzel"
            style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--text-muted)" }}
          >
            POWERED BY AI
          </span>
        </div>
        <h2
          className="font-cormorant"
          style={{ fontSize: 48, fontWeight: 600, color: "var(--cream)", letterSpacing: "0.02em", lineHeight: 1 }}
        >
          Plan Your Event
        </h2>
        <p
          className="font-outfit mt-3"
          style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 480, margin: "12px auto 0" }}
        >
          Tell us your vision and budget. We generate three tailored plans — Budget, Balanced, and Premium.
        </p>
      </div>

      <MongolianDivider />

      {/* Form card */}
      <div
        className="luxury-card mt-10"
        style={{ padding: "40px", maxWidth: 760, margin: "40px auto 0" }}
      >
        {/* Row 1: Event Type + Style */}
        <div className="grid grid-cols-2 gap-6 mb-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <Label>EVENT TYPE</Label>
            <select
              className="luxury-input"
              value={form.eventType}
              onChange={(e) => setForm({ ...form, eventType: e.target.value })}
            >
              {EVENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>STYLE PREFERENCE</Label>
            <select
              className="luxury-input"
              value={form.style}
              onChange={(e) => setForm({ ...form, style: e.target.value })}
            >
              {STYLES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Budget + Guests */}
        <div className="grid grid-cols-2 gap-6 mb-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <Label>TOTAL BUDGET (₮)</Label>
            <input
              type="number"
              className="luxury-input"
              placeholder="e.g. 3,000,000"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
            />
          </div>
          <div>
            <Label>NUMBER OF GUESTS</Label>
            <input
              type="number"
              className="luxury-input"
              placeholder="e.g. 50"
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
            />
          </div>
        </div>

        {/* Allocation sliders */}
        <div
          style={{
            borderTop: "1px solid rgba(212,175,55,0.1)",
            paddingTop: 28,
            marginBottom: 28,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <Label>BUDGET ALLOCATION</Label>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: -4 }}>
                Distribute your budget across services
              </p>
            </div>

            {/* Total indicator */}
            <div
              style={{
                textAlign: "right",
                padding: "8px 16px",
                borderRadius: 8,
                border: `1px solid ${
                  total === 100
                    ? "rgba(212,175,55,0.35)"
                    : total > 100
                    ? "rgba(220,60,60,0.4)"
                    : "rgba(212,175,55,0.15)"
                }`,
                background:
                  total === 100
                    ? "rgba(212,175,55,0.06)"
                    : total > 100
                    ? "rgba(220,60,60,0.06)"
                    : "transparent",
                transition: "all 0.2s",
              }}
            >
              <div
                className="font-cinzel"
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: total === 100 ? "var(--gold)" : total > 100 ? "#e05050" : "var(--text-muted)",
                }}
              >
                {total}%
              </div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em" }}>
                {total === 100 ? "PERFECT ✓" : total > 100 ? "OVER LIMIT" : "REMAINING"}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <AllocationSlider
              label="Venue"
              value={allocation.venue}
              onChange={(v) => setAllocation({ ...allocation, venue: v })}
            />
            <AllocationSlider
              label="Catering"
              value={allocation.catering}
              onChange={(v) => setAllocation({ ...allocation, catering: v })}
            />
            <AllocationSlider
              label="Entertainment"
              value={allocation.entertainment}
              onChange={(v) => setAllocation({ ...allocation, entertainment: v })}
            />
          </div>

          {/* Quick-balance button */}
          {total !== 100 && (
            <div className="flex justify-end mt-4">
              <button
                className="btn-outline-gold"
                onClick={() => setAllocation(DEFAULT_ALLOCATION)}
              >
                Reset to default (30 / 40 / 30)
              </button>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div
            className="mb-4 fade-up"
            style={{
              padding: "12px 16px",
              borderRadius: 8,
              background: "rgba(220,60,60,0.08)",
              border: "1px solid rgba(220,60,60,0.25)",
              color: "#e08080",
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          className="btn-gold w-full"
          style={{ width: "100%", fontSize: 13 }}
          onClick={handleGenerate}
          disabled={loading || !isValid}
        >
          {loading ? "Generating Plans..." : "Generate Plans"}
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center gap-4 mt-16 fade-up">
          <div className="spinner" />
          <p
            className="font-cormorant"
            style={{ fontSize: 18, color: "var(--text-muted)", letterSpacing: "0.05em" }}
          >
            Crafting your perfect event...
          </p>
        </div>
      )}

      {/* Plan results */}
      {plans && !loading && (
        <div className="mt-16">
          <MongolianDivider />
          <div className="text-center my-10">
            <h3
              className="font-cormorant"
              style={{ fontSize: 36, color: "var(--cream)", fontWeight: 600 }}
            >
              Your Event Plans
            </h3>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8 }}>
              Three options curated to match your style and budget
            </p>
          </div>

          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
          >
            {plans.map((plan, i) => (
              <PlanCard key={plan.type} plan={plan} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
