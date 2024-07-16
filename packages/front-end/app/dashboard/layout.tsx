"use client"

import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import { css } from "@/styled-system/css";

interface PropType {
  children: ReactNode;
}

export default function Layout({ children }: PropType) {
  return (
    <div className={css({ display: "flex",width:"100%",height:"100%" })}>
      <Sidebar />
      {children}
    </div>
  );
}
