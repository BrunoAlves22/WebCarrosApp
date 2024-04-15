/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#f3f5f8",
          btn: "#1f1f1f",
          fav: "#EF4444",
          wpp: "#25D366",
          default: "rgba(0, 0, 0, 0.89)",
        },
        text: {
          grey: "#444",
        },
      },
    },
  },
  plugins: [],
};
