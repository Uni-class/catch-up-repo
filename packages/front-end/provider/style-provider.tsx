"use client";
import { theme } from "@/style/theme";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";

interface PropType {
  children: ReactNode;
}

export default function StyleProvider({ children }: PropType) {
  return (
    <>
      <Reset />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}
