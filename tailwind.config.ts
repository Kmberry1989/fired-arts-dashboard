import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "FBC21C",
          orange: "F26C21",
          red: "E32328",
          purple: "692975",
          blue: "283891",
          charcoal: "343538",
          coral: "C83E26",
        }
      }
    },
  },
  plugins: [],
};
export default config;
