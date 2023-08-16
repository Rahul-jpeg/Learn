/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      boxShadow: {
        'glow': '0 0 20px 1px rgba(255, 255, 255, 0.7)',
        '5xl': '0 10px 10px 20px rgba(255, 255, 255, 0.7)'
      },
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "#ffffffb3",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        black: {
          100: "#cccdcf",
          200: "#999b9f",
          300: "#66686f",
          400: "#33363f",
          500: "#00040f",
          600: "#00030c",
          700: "#000209",
          800: "#000206",
          900: "#000103"
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        raleway: ["Raleway", "sans-serif"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}


