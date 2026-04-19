import { useState, useEffect } from "react";
import axios from "axios";
import { MongolianDivider } from "./MongolianOrnament";
import ServiceCard from "./ServiceCard";

const TABS = [
  { key: "venues",        label: "Venues",        endpoint: "/api/venues" },
  { key: "catering",      label: "Catering",       endpoint: "/api/catering" },
  { key: "entertainment", label: "Entertainment",  endpoint: "/api/entertainment" },
];

const FILTER_OPTIONS = {
  venues:        ["All", "minimal", "modern", "luxury", "traditional", "party"],
  catering:      ["All", "minimal", "modern", "luxury", "traditional", "party"],
  entertainment: ["All", "dj", "singer", "band", "host", "instrumental", "traditional", "dance", "comedian"],
};

export default function ServiceExplorer() {
  const [activeTab, setActiveTab]   = useState("venues");
  const [filter, setFilter]         = useState("All");
  const [data, setData]             = useState({ venues: [], catering: [], entertainment: [] });
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

  // Fetch data whenever tab changes
  useEffect(() => {
    const tab = TABS.find((t) => t.key === activeTab);
    if (data[activeTab].length > 0) return; // already loaded

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(tab.endpoint);
        if (res.data.success) {
          setData((prev) => ({ ...prev, [activeTab]: res.data.data }));
        }
      } catch {
        setError("Could not load data. Make sure your backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setFilter("All");
  };

  const currentData = data[activeTab];

  const filteredData =
    filter === "All"
      ? currentData
      : currentData.filter((item) => {
          if (activeTab === "entertainment") return item.type === filter;
          return item.style?.includes(filter);
        });

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
      {/* Section header */}
      <div className="text-center mb-12">
        <div className="section-line mb-4">
          <span className="font-cinzel" style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--text-muted)" }}>
            BROWSE & DISCOVER
          </span>
        </div>
        <h2 className="font-cormorant" style={{ fontSize: 48, fontWeight: 600, color: "var(--cream)", letterSpacing: "0.02em", lineHeight: 1 }}>
          Service Explorer
        </h2>
        <p className="font-outfit mt-3" style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 440, margin: "12px auto 0" }}>
          Browse our curated collection of venues, catering, and entertainment providers.
        </p>
      </div>

      <MongolianDivider />

      {/* Tab navigation */}
      <div className="flex items-center justify-center gap-3 mt-10 mb-8 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
          >
            {tab.label}
            <span style={{
              marginLeft: 8, fontSize: 10, padding: "1px 6px", borderRadius: 10,
              background: activeTab === tab.key ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.06)",
              color: activeTab === tab.key ? "var(--gold)" : "var(--text-muted)",
            }}>
              {data[tab.key].length || "…"}
            </span>
          </button>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
        {FILTER_OPTIONS[activeTab].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "5px 14px", borderRadius: 20,
            border: `1px solid ${filter === f ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.12)"}`,
            background: filter === f ? "rgba(212,175,55,0.1)" : "transparent",
            color: filter === f ? "var(--gold)" : "var(--text-muted)",
            fontSize: 12, letterSpacing: "0.08em", cursor: "pointer",
            transition: "all 0.2s", fontFamily: "Outfit, sans-serif", textTransform: "capitalize",
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="spinner" />
          <p className="font-cormorant" style={{ fontSize: 18, color: "var(--text-muted)" }}>
            Loading services...
          </p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-12" style={{ color: "#e08080", fontSize: 14 }}>
          {error}
        </div>
      )}

      {/* Cards grid */}
      {!loading && !error && filteredData.length > 0 && (
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {filteredData.map((item, i) => (
            <div key={item._id} className="fade-up" style={{ animationDelay: `${i * 0.04}s`, animationFillMode: "both" }}>
              <ServiceCard item={item} type={activeTab} />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredData.length === 0 && currentData.length > 0 && (
        <div className="text-center py-20">
          <p className="font-cormorant" style={{ fontSize: 24, color: "var(--text-muted)" }}>
            No services found for this filter.
          </p>
        </div>
      )}
    </section>
  );
}