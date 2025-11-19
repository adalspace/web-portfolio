/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
        heading: [
          "Montserrat",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
      colors: {
        primary: "#1e90ff", // dodgerblue
        "bg-dark": "#020617",
        "card-dark": "#020617",
        "card-elevated": "#020617",
      },
      boxShadow: {
        glow: "0 0 40px rgba(30,144,255,0.45)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%,100%": { boxShadow: "0 0 0 rgba(30,144,255,0.0)" },
          "50%": { boxShadow: "0 0 40px rgba(30,144,255,0.5)" },
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "fade-in": "fade-in 1s ease-out forwards",
        "scale-in": "scale-in 0.7s ease-out forwards",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "border-spin": "border-spin 8s linear infinite",
      },
    },
  },
  plugins: [],
};
