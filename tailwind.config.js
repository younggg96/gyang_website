module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: "Paytone One",
      secondary: "Mulish",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#fb9900",
        secondary: "#BDB7C2",
        // light
        background: "#F2F1F5",
        text: "#242424",
        accent: "#7A7787",
        border: "#dddddd",
        // dark
        primaryDark: "#1d1d1d",
        backgroundDark: "#171717",
        textDark: "#fdfdfe",
        accentDark: "#262626",
        borderDark: "#30363d",
        placeHolder: "#757879",
        // status
        error: "#ff1010",
        errorBg: "#f6d8d8",
        success: "#06ad03",
        successBg: "#d1eed0",
        info: "#3498db",
        infoBg: "#dee7ee",
        warning: "#e1a325",
        warningBg: "#fceacc",
      },
      animation: {
        loader: "animloader 0.3s 0.45s linear infinite alternate",
      },
      keyframes: {
        animloader: {
          "0%": { height: "4px" },
          "100%": { height: "48px" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
