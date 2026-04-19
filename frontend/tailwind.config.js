/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F0D060",
          dark: "#A08820",
        },
        dark: {
          bg: "#0B0B0B",
          card: "#111111",
          elevated: "#161616",
          border: "#1E1E1E",
        },
        cream: "#E8E0D0",
        muted: "#7A7060",
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        cormorant: ['"Cormorant Garamond"', "serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        shimmer: "shimmer 2.5s linear infinite",
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400% center" },
          "100%": { backgroundPosition: "400% center" },
        },
      },
      backgroundImage: {
        "gold-shimmer":
          "linear-gradient(90deg, #A08820 0%, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, #A08820 100%)",
      },
    },
  },
  plugins: [],
};
