"use client";

import { ReactNode, Suspense, useEffect } from "react";
import { css } from "@/styled-system/css";
import Sidebar from "@/app/(sidebar-pages)/_components/Sidebar";
import { useAccountController } from "@/hook/useAccount";
import Header from "./_components/Header";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const accountController = useAccountController();

  if (accountController.isError) {
    accountController.goToLogin();
  }

  if (accountController.isLoading) {
    return (
      <div
        className={css({
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <div
          className={css({
            fontSize: "2em",
          })}
        >
          User Profile Loading Skeleton UI
        </div>
      </div>
    );
  }

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
          bg: "#F5F7FA",
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
          })}
        >
          <main
            className={css({ bg: "#fff", borderRadius: "0.5rem", flexGrow: 1 })}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
