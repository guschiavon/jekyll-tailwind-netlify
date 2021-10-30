const customTheme = require('./_data/theme.json')

module.exports = {
  purge: [
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_posts/*.md",
    "./*.html",
  ],
  darkMode: false,
  theme: {
    extend: customTheme,
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
