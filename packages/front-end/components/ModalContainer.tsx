"use client";

import { useRouter } from "@/hook/useRouter";
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
  return (
    <dialog open>
        안녕하세요
        {children}
    </dialog>
  )
}
