/* ──────────────────────────────────────────────────────────────────────────── *
 * Mongolian Ornament Components
 * Traditional geometric patterns used as decorative UI elements.
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * Horizontal ornamental section divider.
 * Inspired by the Mongolian "тохой хээ" (elbow meander) geometric motif.
 */
export function MongolianDivider({ opacity = 0.5 }) {
  return (
    <div className="flex items-center gap-4 my-2" style={{ opacity }}>
      {/* Left fade line */}
      <div
        className="flex-1"
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(212,175,55,0.4))",
        }}
      />

      {/* Central SVG ornament */}
      <svg
        width="180"
        height="28"
        viewBox="0 0 180 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Left meander arm */}
        <path
          d="M0,14 L15,14 L15,6 L25,6 L25,22 L35,22 L35,6 L45,6 L45,14 L58,14"
          stroke="#D4AF37"
          strokeWidth="1.2"
          strokeLinecap="square"
          fill="none"
          opacity="0.7"
        />

        {/* Right meander arm (mirrored) */}
        <path
          d="M180,14 L165,14 L165,6 L155,6 L155,22 L145,22 L145,6 L135,6 L135,14 L122,14"
          stroke="#D4AF37"
          strokeWidth="1.2"
          strokeLinecap="square"
          fill="none"
          opacity="0.7"
        />

        {/* Center diamond cluster */}
        <polygon
          points="90,4 97,14 90,24 83,14"
          fill="#D4AF37"
          opacity="0.9"
        />
        <polygon
          points="90,8 95,14 90,20 85,14"
          fill="#0B0B0B"
        />
        <polygon
          points="90,11 93,14 90,17 87,14"
          fill="#D4AF37"
          opacity="0.6"
        />

        {/* Connector dots */}
        <circle cx="68" cy="14" r="2" fill="#D4AF37" opacity="0.5" />
        <circle cx="75" cy="14" r="1.5" fill="#D4AF37" opacity="0.35" />
        <circle cx="81" cy="14" r="1" fill="#D4AF37" opacity="0.2" />

        <circle cx="112" cy="14" r="2" fill="#D4AF37" opacity="0.5" />
        <circle cx="105" cy="14" r="1.5" fill="#D4AF37" opacity="0.35" />
        <circle cx="99" cy="14" r="1" fill="#D4AF37" opacity="0.2" />
      </svg>

      {/* Right fade line */}
      <div
        className="flex-1"
        style={{
          height: "1px",
          background: "linear-gradient(to left, transparent, rgba(212,175,55,0.4))",
        }}
      />
    </div>
  );
}

/**
 * Decorative corner ornament for cards.
 * The `position` prop controls which corner: "tl" | "tr" | "bl" | "br"
 */
export function CornerOrnament({ position = "tl", size = 32, opacity = 0.3 }) {
  const transforms = {
    tl: "rotate(0)",
    tr: "rotate(90)",
    br: "rotate(180)",
    bl: "rotate(270)",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <g transform={transforms[position]} transformOrigin="16 16">
        {/* Outer L-bracket */}
        <path
          d="M2,2 L2,12 L5,12 L5,5 L12,5 L12,2 Z"
          fill="#D4AF37"
        />
        {/* Inner L-bracket */}
        <path
          d="M5,8 L5,14 L8,14 L8,8 L14,8 L14,5 L8,5 L8,8 Z"
          fill="#D4AF37"
          opacity="0.5"
        />
        {/* Corner dot */}
        <rect x="2" y="2" width="3" height="3" fill="#D4AF37" />
      </g>
    </svg>
  );
}

/**
 * Small inline ornament / bullet for list-style separators.
 */
export function OrnamentDot({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <polygon
        points="6,1 11,6 6,11 1,6"
        fill="#D4AF37"
        opacity="0.7"
      />
      <polygon
        points="6,3.5 8.5,6 6,8.5 3.5,6"
        fill="#0B0B0B"
      />
      <polygon
        points="6,5 7,6 6,7 5,6"
        fill="#D4AF37"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * Full-width decorative header band with Mongolian pattern.
 * Used at the top of the hero section.
 */
export function MongolianBand({ height = 6 }) {
  return (
    <div style={{ width: "100%", overflow: "hidden", height }}>
      <svg
        width="100%"
        height={height}
        viewBox="0 0 800 6"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="band-pattern"
            x="0"
            y="0"
            width="20"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="10" height="3" fill="#D4AF37" opacity="0.8" />
            <rect x="10" y="3" width="10" height="3" fill="#D4AF37" opacity="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="6" fill="url(#band-pattern)" />
      </svg>
    </div>
  );
}
