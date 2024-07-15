import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          naver: {
            green: { value: "#03c75a" },
          },
          kakao: {
            container: { value: "#fee500" },
            symbol: { value: "#000" },
            lable: { value: "#000000d8" },
          },
          google: {
            bright: { value: "#fff" },
            dark: { value: "#4285F4" },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
