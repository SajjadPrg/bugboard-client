/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Lalezar: "Lalezar",
        Vazirmatn: "Vazirmatn",
      },
      colors: {
        brand: "#9d4edd",
        brandActive: "#7b2cbf",
      },
    },
  },
  plugins: [],
};
