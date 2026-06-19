import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },

      fontSize: {
        h1: ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        h3: ["24px", { lineHeight: "1.3", fontWeight: "600" }],

        "body-large": ["18px", { lineHeight: "1.5", fontWeight: "400" }],
        body: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-small": ["14px", { lineHeight: "1.4", fontWeight: "400" }],

        caption: ["12px", { lineHeight: "1.33", fontWeight: "500" }],
        overline: ["12px", { lineHeight: "1.33", fontWeight: "600" }],
      },

      boxShadow: {
        xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",

        sm: "0px 1px 3px 0px rgba(16, 24, 40, 0.1), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",

        md: "0px 4px 6px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",

        lg: "0px 10px 15px -3px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)",
      },
    },
  },
  plugins: [],
} satisfies Config;