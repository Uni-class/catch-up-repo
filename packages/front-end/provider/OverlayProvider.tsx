"use client";
import { ReactNode } from "react";
import { OverlayProvider as Provider } from "overlay-kit";

interface PropType {
  children?: ReactNode;
}

export default function OverlayProvider({ children }: PropType) {
  return <Provider>{children}</Provider>;
}
