"use client";

import { css } from "@/styled-system/css";
import {ReactNode, useEffect, useState, Children, isValidElement, cloneElement, ReactElement} from "react";

interface PropType {
  children: ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
}

export default function ModalContainer({
  children,
  onClose,
  isOpen = false,
}: PropType) {

  const [closingBlocked, setClosingBlocked] = useState(false);

  const closeWindow = () => {
    if (!closingBlocked && onClose)
      onClose();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeWindow();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [closeWindow]);

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
          onClick={closeWindow}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {
              Children.map(children, (child) => {
                if (isValidElement(child)) {
                  return cloneElement(child as ReactElement, {
                    setClosingBlocked
                  });
                }
                return child;
              })
            }
          </div>
        </dialog>
      )}
    </>
  );
}
