"use client";

import { css } from "@/styled-system/css";
import { ReactNode, useEffect } from "react";

interface PropType {
  children: ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
}

export default function ModalContainer({
  children,
  onClose = () => {},
  isOpen = false,
}: PropType) {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const handleBackdropClick = () => {
    onClose();
  };
  return (
    <>
      {isOpen && (
        <dialog
          open
          className={css({
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 100,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(64, 64, 64, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
          onClick={handleBackdropClick}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </dialog>
      )}
    </>
  );
}
