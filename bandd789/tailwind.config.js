/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#d11141",
          dark: "#a60d32",
          light: "#ff3b5c"
        },
        background: "#0a0a0a",
        foreground: "#f7f7f7",
        card: "#141414",
        muted: "#888888",
        border: "#2a2a2a"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.2)"
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}
