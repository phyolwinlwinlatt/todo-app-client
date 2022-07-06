module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "main-black": "#181820",
        "main-black-opacity": "#20212C",
        "main-pink": "#C867C0",
        "main-pink-hover": "#D06BDC",
        "main-yellow": "#8E6840",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
