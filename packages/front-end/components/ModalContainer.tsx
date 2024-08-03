"use client";


import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";
import {ReactNode, useEffect, useState, Children, isValidElement, cloneElement, ReactElement, useCallback} from "react";

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
  const router = useRouter();

  const closeWindow = useCallback(() => {
    if (isOpen && !closingBlocked && onClose)
      onClose();
  },[closingBlocked, isOpen, onClose]);

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

  useEffect(() => {
    closeWindow();
  }, [closeWindow, router.pathname]);

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
