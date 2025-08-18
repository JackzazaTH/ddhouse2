
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ffe7e7',
          100: '#ffcfcf',
          200: '#ffa3a3',
          300: '#ff7676',
          400: '#ff4a4a',
          500: '#e60023', /* brand red */
          600: '#cc001f',
          700: '#990017',
          800: '#660010',
          900: '#330008',
        },
      }
    },
  },
  plugins: [],
}
