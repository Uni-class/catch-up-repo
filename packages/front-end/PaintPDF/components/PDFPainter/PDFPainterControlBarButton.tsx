import { styled } from "@/styled-system/jsx";
import { memo } from "react";

const PDFPainterControlBarButtonComponent = styled("button", {
  base: {
    padding: "0.4em 0.8em",
    userSelect: "none",
    color: "#000000",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    _disabled: {
      backgroundColor: "#d8d8d8",
      cursor: "default",
      _hover: {
        backgroundColor: "#d8d8d8",
      },
    },
    _hover: {
      bg: "gray.100",
    },
  },
});

export const PDFPainterControlBarButton = memo(
  PDFPainterControlBarButtonComponent
);
