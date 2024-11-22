import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        /// Light Mode
        veryLightGray: "#FAFAFA",
        veryLightGrayishBlue: "#E4E5F1",
        lightGrayishBlue: "#D2D3DB",
        darkGrayishBlue: "#9394A5",
        veryDarkGrayishBlue: "#484B6A",

        /// Dark Mode
        veryDarkBlue: "#161722",
        veryDarkDesaturatedBlue: "#25273C",
        lightGrayishBlueDark: "#CACDE8",
        lightGrayishBlueDarkHover: "#E4E5F1",
        darkGrayishBlueDark: "#777A92",
        veryDarkGrayishBlueDark: "#4D5066",
        veryDarkGrayishBlueDarkHover: "#393A4C",
      }
    },
  },
  plugins: [],
} satisfies Config;
