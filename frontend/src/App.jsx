import { useState, useEffect } from "react";
import Header from "./components/Header";
import PlannerSection from "./components/PlannerSection";
import ServiceExplorer from "./components/ServiceExplorer";
import AuthPage from "./components/AuthPage";
import SavedPlansSection from "./components/SavedPlansSection";
import AIChatSection from "./components/AIChatSection";   // ← NEW
import { MongolianBand, OrnamentDot } from "./components/MongolianOrnament";

function loadAuth() {
  try {
    const token = localStorage.getItem("zebe_token");
    const user  = JSON.parse(localStorage.getItem("zebe_user") || "null");
    return token && user ? { token, user } : null;
  } catch {
    return null;
  }
}

function Hero({ onStart }) {
  return (
    <div
      className="mongol-texture relative overflow-hidden"
      style={{
        minHeight: 440,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        borderBottom: "1px solid rgba(212,175,55,0.12)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          background: "radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div className="text-center relative z-10 fade-up">
        <div className="flex items-center justify-center gap-3 mb-6">
          <OrnamentDot size={10} />
          <span className="font-cinzel" style={{ fontSize: 11, letterSpacing: "0.4em", color: "var(--text-muted)" }}>
            ULAANBAATAR · MONGOLIA
          </span>
          <OrnamentDot size={10} />
        </div>
        <h1
          className="font-cormorant"
          style={{ fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 300, letterSpacing: "0.1em", lineHeight: 0.9, marginBottom: 24 }}
        >
          <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Your Event,</span>
          <br />
          <span className="text-gold-shimmer">Reimagined.</span>
        </h1>
        <p className="font-outfit" style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.7 }}>
          AI-powered event planning that matches your vision, budget, and style.
          Venues. Catering. Entertainment — all in one place.
        </p>
        <button className="btn-gold" style={{ fontSize: 12 }} onClick={onStart}>
          Start Planning
        </button>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <MongolianBand height={4} />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(212,175,55,0.1)", padding: "32px 24px", textAlign: "center" }}>
      <MongolianBand height={3} />
      <div style={{ marginTop: 24 }}>
        <span className="font-cinzel text-gold-shimmer" style={{ fontSize: 16, letterSpacing: "0.3em" }}>ZEBE</span>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8, letterSpacing: "0.1em" }}>
          © 2025 ZEBE Event Planner · Crafted with precision
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [section, setSection] = useState("home");
  const [auth, setAuth] = useState(loadAuth);

  useEffect(() => {
    const onStorage = () => setAuth(loadAuth());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleAuthSuccess = (user, token) => {
    setAuth({ user, token });
    setSection("planner");
  };

  const handleLogout = () => {
    localStorage.removeItem("zebe_token");
    localStorage.removeItem("zebe_user");
    setAuth(null);
    setSection("home");
  };

  const goToPlanner = () => {
    if (auth) {
      setSection("planner");
    } else {
      setSection("auth");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {section !== "home" && section !== "auth" && (
        <Header
          activeSection={section}
          onSectionChange={setSection}
          user={auth?.user}
          onLogout={handleLogout}
        />
      )}

      {section === "home" && (
        <>
          <div
            className="flex items-center justify-between"
            style={{ padding: "20px 32px", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}
          >
            <span className="font-cinzel text-gold-shimmer" style={{ fontSize: 18, letterSpacing: "0.25em", fontWeight: 700 }}>
              ZEBE
            </span>
            <div className="flex gap-2">
              <button className="tab-btn" onClick={goToPlanner}>AI Planner</button>
              <button className="tab-btn" onClick={() => setSection("explorer")}>Services</button>
            </div>
          </div>
          <Hero onStart={goToPlanner} />
        </>
      )}

      {section === "auth" && (
        <AuthPage onAuthSuccess={handleAuthSuccess} onBack={() => setSection("home")} />
      )}

      {section === "planner" && (
        <PlannerSection token={auth?.token} user={auth?.user} />
      )}

      {section === "explorer" && <ServiceExplorer />}

      {section === "saved" && <SavedPlansSection token={auth?.token} />}

      {/* ── NEW: AI Chat ──────────────────────────────────────────────────── */}
      {section === "chat" && <AIChatSection />}

      <Footer />
    </div>
  );
}