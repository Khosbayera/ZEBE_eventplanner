import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MongolianBand, OrnamentDot } from "./MongolianOrnament";

const SUGGESTED_QUESTIONS = [
  "100 хүний төрсөн өдрийн нэмд 2 сая төгрөг хангалттай юу?",
  "Хуримд ямар venue тохиромжтой вэ?",
  "Corporate event-д ямар entertainment байвал зохих вэ?",
  "50 хүний арга хэмжээнд catering-ийн зардал хэд орох вэ?",
];

function ChatBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div
      className="fade-up"
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 12,
      }}
    >
      {/* AI avatar */}
      {!isUser && (
        <div
          style={{
            width: 32,
            height: 32,
            border: "1px solid rgba(212,175,55,0.35)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            color: "var(--gold)",
            flexShrink: 0,
            marginRight: 10,
            background: "rgba(212,175,55,0.05)",
          }}
        >
          Z
        </div>
      )}

      <div
        style={{
          maxWidth: "72%",
          padding: "12px 16px",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          background: isUser
            ? "rgba(212,175,55,0.12)"
            : "rgba(255,255,255,0.04)",
          border: isUser
            ? "1px solid rgba(212,175,55,0.25)"
            : "1px solid rgba(255,255,255,0.06)",
          fontSize: 14,
          color: "var(--cream)",
          lineHeight: 1.65,
          whiteSpace: "pre-wrap",
          fontFamily: "var(--font-outfit, sans-serif)",
        }}
      >
        {text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div
        style={{
          width: 32,
          height: 32,
          border: "1px solid rgba(212,175,55,0.35)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          color: "var(--gold)",
          background: "rgba(212,175,55,0.05)",
        }}
      >
        Z
      </div>
      <div
        style={{
          padding: "12px 16px",
          borderRadius: "16px 16px 16px 4px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          gap: 5,
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.5)",
              animation: `bounce 1.2s infinite ${i * 0.2}s`,
            }}
          />
        ))}
        <style>{`
          @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
            30% { transform: translateY(-6px); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default function AIChatSection() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Сайн байна уу! Би ZEBE-ийн AI зөвлөх. Арга хэмжээний төлөвлөлттэй холбоотой асуулт байвал надаас асуугаарай. Төсөв, хүний тоо, venue, catering — бүгдийг зөвлөж чадна! 🎉",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Build messages array for API (exclude first AI greeting from history)
      const apiMessages = newMessages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      }));

      const { data } = await axios.post("/api/chat", { messages: apiMessages });

      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Уучлаарай, алдаа гарлаа. Дахин оролдоно уу." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Серверт холбогдоход алдаа гарлаа. Backend ажиллаж байгаа эсэхийг шалгана уу." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="section-line mb-4">
          <span className="font-cinzel" style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--text-muted)" }}>
            AI POWERED
          </span>
        </div>
        <h2
          className="font-cormorant"
          style={{ fontSize: 48, fontWeight: 600, color: "var(--cream)", letterSpacing: "0.02em", lineHeight: 1 }}
        >
          Event Consultant
        </h2>
        <p className="font-outfit mt-3" style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 420, margin: "12px auto 0" }}>
          Арга хэмжээний талаар асуулт асуу — AI таны бодит мэдээлэлд тулгуурлан зөвлөнө.
        </p>
      </div>

      {/* Suggested questions */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={loading}
            style={{
              background: "rgba(212,175,55,0.05)",
              border: "1px solid rgba(212,175,55,0.2)",
              color: "rgba(212,175,55,0.7)",
              borderRadius: 20,
              padding: "6px 14px",
              fontSize: 12,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "var(--font-outfit, sans-serif)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(212,175,55,0.1)";
              e.currentTarget.style.color = "var(--gold)";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(212,175,55,0.05)";
              e.currentTarget.style.color = "rgba(212,175,55,0.7)";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)";
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div
        className="luxury-card"
        style={{
          border: "1px solid rgba(212,175,55,0.15)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: 520,
        }}
      >
        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 20px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(212,175,55,0.15) transparent",
          }}
        >
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} text={m.content} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(212,175,55,0.08)" }} />

        {/* Input */}
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            gap: 12,
            alignItems: "flex-end",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Асуулт бичнэ үү... (Enter = илгээх)"
            disabled={loading}
            rows={1}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: 10,
              padding: "10px 14px",
              color: "var(--cream)",
              fontSize: 14,
              resize: "none",
              outline: "none",
              fontFamily: "var(--font-outfit, sans-serif)",
              lineHeight: 1.5,
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.2)")}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="btn-gold"
            style={{
              fontSize: 12,
              padding: "10px 20px",
              opacity: loading || !input.trim() ? 0.4 : 1,
              flexShrink: 0,
            }}
          >
            {loading ? "..." : "Илгээх"}
          </button>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <MongolianBand height={3} />
      </div>
    </section>
  );
}