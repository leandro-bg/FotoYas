// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: { DEFAULT: "#901ba3", foreground: "#ffffff" },
            danger: { DEFAULT: "#e234f8", foreground: "#ffffff" },
            success: { DEFAULT: "#58D68D", foreground: "#ffffff" },
          },
        },
      },
    }),
  ],
};