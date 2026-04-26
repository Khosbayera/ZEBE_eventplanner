import { MongolianBand } from "./MongolianOrnament";

export default function Header({ activeSection, onSectionChange, user, onLogout }) {
  return (
    <header
      style={{
        background: "rgba(11, 11, 11, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.12)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <MongolianBand height={3} />

      <div
        className="flex items-center justify-between"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 36,
              height: 36,
              border: "1px solid rgba(212,175,55,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(45deg)",
            }}
          >
            <span className="font-cinzel font-bold text-gold-shimmer" style={{ transform: "rotate(-45deg)", fontSize: 13 }}>
              Z
            </span>
          </div>
          <div>
            <span className="font-cinzel text-gold-shimmer" style={{ fontSize: 22, letterSpacing: "0.25em", fontWeight: 700 }}>
              ZEBE
            </span>
            <p className="font-outfit" style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--text-muted)", marginTop: -2 }}>
              EVENT PLANNER
            </p>
          </div>
        </div>

        {/* Nav + user */}
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => onSectionChange("planner")}
              className="tab-btn"
              style={activeSection === "planner" ? { color: "var(--gold)", borderColor: "rgba(212,175,55,0.4)", background: "rgba(212,175,55,0.06)" } : {}}
            >
              AI Planner
            </button>

            <button
              onClick={() => onSectionChange("chat")}
              className="tab-btn"
              style={activeSection === "chat" ? { color: "var(--gold)", borderColor: "rgba(212,175,55,0.4)", background: "rgba(212,175,55,0.06)" } : {}}
            >
              AI Chat
            </button>

            <button
              onClick={() => onSectionChange("explorer")}
              className="tab-btn"
              style={activeSection === "explorer" ? { color: "var(--gold)", borderColor: "rgba(212,175,55,0.4)", background: "rgba(212,175,55,0.06)" } : {}}
            >
              Services
            </button>

            {user && (
              <button
                onClick={() => onSectionChange("saved")}
                className="tab-btn"
                style={activeSection === "saved" ? { color: "var(--gold)", borderColor: "rgba(212,175,55,0.4)", background: "rgba(212,175,55,0.06)" } : {}}
              >
                My Plans
              </button>
            )}
          </nav>

          {user && (
            <div className="flex items-center gap-3" style={{ marginLeft: 8 }}>
              <div style={{ width: 1, height: 20, background: "rgba(212,175,55,0.2)" }} />
              <span className="font-outfit" style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.name}
              </span>
              <button
                onClick={onLogout}
                className="tab-btn"
                style={{ fontSize: 11, color: "rgba(212,175,55,0.6)", borderColor: "rgba(212,175,55,0.15)", padding: "4px 12px" }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}