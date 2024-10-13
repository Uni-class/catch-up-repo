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
          padding: "0 1em",
        })}
      >
        <Header/>
        {children}
      </div>
    </div>
  );
}
