"use client";

import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";
import { ReactNode, useEffect } from "react";

interface PropType {
  children: ReactNode;
}

export default function ModalContainer({ children }: PropType) {
  const router = useRouter();
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      router.back();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const handleBackdropClick = () => {
    router.back();
  };
  return (
    <dialog
      open
      className={css({
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(128, 128, 128, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}
      onClick={handleBackdropClick}
    >
      {children}
    </dialog>
  );
}
