"use client";

import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PropType {
  children: ReactNode;
}

export default function ToastProvider({ children }: PropType) {
  return (
    <>
      {children}
      <ToastContainer autoClose={2000} role="alert" closeOnClick={true} />
    </>
  );
}
