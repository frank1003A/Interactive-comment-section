/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // enable dark mode
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("tailwindcss-animate"),
  ],
};
