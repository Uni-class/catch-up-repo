import { styled } from "@/styled-system/jsx";

export const HeaderControlButton = styled("button", {
  base: {
    width: "1.92rem",
    height: "1.92rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    bg: "primary.400",
    fontSize: "1.08rem",
    cursor: "pointer",
    borderRadius: "0.5rem",
    _disabled: {
      bg: "secondary.200",
      color: "black",
      border: "1px solid",
      borderColor: "black",
      cursor: "default",
      _hover: {
        color: "black",
      },
    },
    _hover: {
      color: "primary.50",
    },
  },
});
