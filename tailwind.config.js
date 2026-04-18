/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Arial Black"', 'sans-serif'],
        heading: ['Outfit', '"Segoe UI"', 'sans-serif'],
        body: ['"Be Vietnam Pro"', 'Calibri', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
