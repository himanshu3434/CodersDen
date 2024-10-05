import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "#1A1A1A",
        purple: "#CBACF9",
        purpleDark: "#B29FC9",
        colorChartV1: "#FDAF7B",
        colorChartV2: "#D4ADFC",

        semiblack: "#2A2A2A",
        blackLight: "#3A3A3A",
        blackLighter: "#4A4A4A",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
