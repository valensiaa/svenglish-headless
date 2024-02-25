/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/pages/*.jsx",
    "./src/components/*.jsx",
    "./src/layouts/*.jsx",
  ],

  theme: {
    colors: {
      ivory: "#F2F1EC",
      navy_blue: "#365B6D",
      white: "#ffffff",
      black: "#000000",
    },
    fontFamily: {
      sans: ["Barlow", "sans-serif"],
    },

    extend: {
      spacing: {
        8: "8px",
        16: "16px",
        24: "24px",
        40: "40px",
        56: "56px",
      },
    },
  },
  plugins: [],
};
