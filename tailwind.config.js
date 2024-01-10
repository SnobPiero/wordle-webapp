const { themeDefault } = require("./themes/default");
const { themeDark } = require("./themes/dark");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: 'media', // default:'media', use only for false or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-base)", "sans-serif"],
      },
      animation: {
        "gradient-x-slow": "gradient-x 5s ease infinite",
        "gradient-x": "gradient-x 1s ease infinite",
        "gradient-x-2x": "gradient-x .2s ease infinite",
        "loading-pin-move": "loading-pin-move 1s ease-in alternate infinite",
        "loading-pin-move-small": "loading-pin-move-small 1s ease-in alternate infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "loading-pin-move": {
          "0%": {
            width: "0.25rem",
            left: "0%",
          },
          "50%": {
            width: "0.35rem",
          },
          "100%": {
            width: "0.25rem",
            left: "75%",
          },
        },
        "loading-pin-move-small": {
          "0%": {
            width: "0.125rem",
            left: "0%",
          },
          "50%": {
            width: "0.2rem",
          },
          "100%": {
            width: "0.125rem",
            left: "75%",
          },
        },
      },
      backgroundImage: {
        "login-image": "url('/login-bg.webp')",
        "header-bg": "url('/header.webp')",
      },
    },
  },
  colors: {
    current: "currentColor",
  },
  plugins: [
    require("tailwindcss-themer")({
      defaultTheme: {
        // put the default values of any config you want themed
        // just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
        extend: {
          colors: themeDefault,
        },
      },
      themes: [
        {
          name: "dark",
          extend: { colors: themeDark },
        },
      ],
    }),
  ],
};
