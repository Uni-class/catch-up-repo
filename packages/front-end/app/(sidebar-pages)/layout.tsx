"use client";

import { ReactNode, } from "react";
import { css } from "@/styled-system/css";
import Sidebar from "@/app/(sidebar-pages)/_components/Sidebar";
import Header from "./_components/Header";
import NavTitle from "./_components/NavTitle";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {

  return (
    <div
      className={css({
        display: "flex",
        width: "100%",
        height: "100%",
      })}
    >
      <Sidebar />
      <div
        className={css({
          flex: 1,
          bg: "grey.50",
          display: "flex",
          flexDirection: "column",
        })}
      >
        <Header />
        <div
          className={css({
            padding: "0 2.625rem 3.96rem 2.625rem",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflow: "scroll"
          })}
        >
          <NavTitle />
          <main
            className={css({
              bg: "#fff",
              borderRadius: "0.5rem",
              flex: 1,
              overflowY: "scroll",
              padding: "1.208rem 1.6875rem 1.41rem 1.6875rem"
            })}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
// 29 40.5 34 40.5
// 1.208 1.6875 1.41 1.6875