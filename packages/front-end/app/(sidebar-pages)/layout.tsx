"use client";

import { ReactNode } from "react";
import { css } from "@/styled-system/css";
import Sidebar from "@/app/(sidebar-pages)/_components/Sidebar";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {

  return (
    <div className={css({
      display: "flex",
      width: "100%",
      height: "100%",
    })}>
      <Sidebar/>
      <div className={css({
        flexGrow: 1,
        padding: "2em 1em",
      })}>
        {children}
      </div>
    </div>
  );
}