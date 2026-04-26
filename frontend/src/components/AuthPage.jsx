import { useState } from "react";
import axios from "axios";
import { MongolianBand, OrnamentDot } from "./MongolianOrnament";

// ── Small helpers that match ZEBE's existing label style ──────────────────────
function Label({ children }) {
  return (
    <label
      className="font-outfit"
      style={{
        fontSize: 11,
        letterSpacing: "0.15em",
        color: "var(--text-muted)",
        display: "block",
        marginBottom: 8,
      }}
    >
      {children}
    </label>
  );
}

function ErrorBox({ msg }) {
  if (!msg) return null;
  return (
    <div
      style={{
        padding: "12px 16px",
        borderRadius: 8,
        background: "rgba(220,60,60,0.08)",
        border: "1px solid rgba(220,60,60,0.25)",
        color: "#e08080",
        fontSize: 13,
        marginBottom: 16,
      }}
    >
      {msg}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function AuthPage({ onAuthSuccess, onBack }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isRegister = mode === "register";

  const handleSubmit = async () => {
    setError("");

    if (!form.email || !form.password || (isRegister && !form.name)) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const payload = isRegister
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const { data } = await axios.post(endpoint, payload);

      if (data.success) {
        // Persist token + user so the app survives a refresh
        localStorage.setItem("zebe_token", data.token);
        localStorage.setItem("zebe_user", JSON.stringify(data.user));
        onAuthSuccess(data.user, data.token);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Cannot reach server. Make sure your backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <section
      style={{
        maxWidth: 480,
        margin: "0 auto",
        padding: "80px 24px 60px",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Header */}
      <div className="text-center mb-10 fade-up">
        <div className="flex items-center justify-center gap-3 mb-5">
          <OrnamentDot size={8} />
          <span
            className="font-cinzel"
            style={{ fontSize: 11, letterSpacing: "0.4em", color: "var(--text-muted)" }}
          >
            ZEBE EVENT PLANNER
          </span>
          <OrnamentDot size={8} />
        </div>

        <h2
          className="font-cormorant"
          style={{
            fontSize: 42,
            fontWeight: 600,
            color: "var(--cream)",
            letterSpacing: "0.02em",
            lineHeight: 1.1,
          }}
        >
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>
        <p
          className="font-outfit mt-2"
          style={{ fontSize: 14, color: "var(--text-muted)" }}
        >
          {isRegister
            ? "Sign up to save and revisit your event plans."
            : "Sign in to access your saved plans."}
        </p>
      </div>

      {/* Card */}
      <div className="luxury-card fade-up" style={{ padding: "36px 32px" }}>
        <ErrorBox msg={error} />

        {/* Name field (register only) */}
        {isRegister && (
          <div className="mb-5">
            <Label>FULL NAME</Label>
            <input
              type="text"
              className="luxury-input"
              placeholder="e.g. Батболд"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <Label>EMAIL ADDRESS</Label>
          <input
            type="email"
            className="luxury-input"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <Label>PASSWORD</Label>
          <input
            type="password"
            className="luxury-input"
            placeholder={isRegister ? "At least 6 characters" : "Your password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Submit */}
        <button
          className="btn-gold w-full"
          style={{ width: "100%", fontSize: 13 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? isRegister
              ? "Creating Account..."
              : "Signing In..."
            : isRegister
            ? "Create Account"
            : "Sign In"}
        </button>

        {/* Toggle mode */}
        <div className="text-center mt-6">
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
            {isRegister ? "Already have an account?" : "Don't have an account?"}
          </span>{" "}
          <button
            onClick={() => {
              setMode(isRegister ? "login" : "register");
              setError("");
              setForm({ name: "", email: "", password: "" });
            }}
            style={{
              fontSize: 13,
              color: "var(--gold)",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            {isRegister ? "Sign In" : "Register"}
          </button>
        </div>
      </div>

      {/* Back to home */}
      <div className="text-center mt-6">
        <button
          className="btn-outline-gold"
          onClick={onBack}
          style={{ fontSize: 12 }}
        >
          ← Back to Home
        </button>
      </div>

      <div style={{ marginTop: 40 }}>
        <MongolianBand height={3} />
      </div>
    </section>
  );
}
