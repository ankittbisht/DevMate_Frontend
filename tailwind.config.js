/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        borel: ["Borel", "serif"],
        rubik: ["Rubik", "serif"],
      },
    },
  },
  plugins: [],
};
