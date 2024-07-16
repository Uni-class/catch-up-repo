import { theme } from "@/style/theme";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        ...theme,
      },
    },
  },

  conditions: {
    extend: {
      hoverNotActive: "&:hover:not(:active)"
    }
  },

  // The output directory for your css system
  outdir: "styled-system",
  jsxFramework: 'react'
});
