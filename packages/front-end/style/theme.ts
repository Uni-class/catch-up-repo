import { Tokens } from "@pandacss/dev";

export const theme: Tokens = {
  colors: {
    google: {
      base: {
        value: "#ffffff",
        text: {
          value: "#000000",
        },
      },
      emphasize: {
        value: "#d6d6d6",
        text: {
          value: "#000000",
        },
      },
      dark: {
        value: "#393939",
        text: {
          value: "#ffffff",
        },
      },
    },
    naver: {
      base: {
        value: "#03c75a",
        text: {
          value: "#ffffff",
        },
      },
      emphasize: {
        value: "#00923a",
        text: {
          value: "#ffffff",
        },
      },
      dark: {
        value: "#007132",
        text: {
          value: "#ffffff",
        },
      },
    },
    kakao: {
      base: {
        value: "#fee500",
        text: {
          value: "#000000",
        },
      },
      emphasize: {
        value: "#ddc400",
        text: {
          value: "#000000",
        },
      },
      dark: {
        value: "#b39200",
        text: {
          value: "#000000",
        },
      },
    },
    primary: {
      50: { value: "#ABBDF5" },
      100: { value: "#2653D4" },
      200: { value: "#0039C8" },
      300: { value: "#0136B9" },
      400: { value: "#022B92" },
      500: { value: "#022D9C" },
    },
    secondary: {
      100: { value: "#C7FF33" },
      200: { value: "#AFFD06" },
      300: { value: "#9FDF05" },
    },
    tertiary: {
      100: { value: "#C1D1FF" },
      200: { value: "#ABBDF5" },
      300: { value: "#9AADE0" },
    },
    gray: {
      50: { value: "#F5F7FA" },
      100: { value: "#EBEDFA" },
      200: { value: "#D9DBEC" },
      300: { value: "#D6D7E5" },
      400: { value: "#BBBDD5" },
      500: { value: "#8084AA" },
      600: { value: "#787976" },
      700: { value: "#0039C8" },
    },
    grey: {
      50: { value: "#F5F7FA" },
      100: { value: "#EBEDFA" },
      200: { value: "#D9DBEC" },
      300: { value: "#D6D7E5" },
      400: { value: "#BBBDD5" },
      500: { value: "#8084AA" },
      600: { value: "#787976" },
      700: { value: "#0039C8" },
    },
  },
  fonts: {
    Pretendard: { value: "var(--font-pretendard), sans-serif" },
  },
};
// F5F7FA 8084AA EBEDFA D9DBEC 8084AA D6D7E5 0039C8 BBBDD5 787976