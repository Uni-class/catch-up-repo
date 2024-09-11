"use client";

import { ReactNode, Suspense } from "react";
import { css } from "@/styled-system/css";
import Sidebar from "@/app/(sidebar-pages)/_components/Sidebar";
import { useAccountController } from "@/hook/useAccount";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const accountController = useAccountController();

  if (!accountController.account) {
    if (!accountController.isLoading) {
      accountController.goToLogin();
    }
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
          App Loading Skeleton UI
        </div>
      </div>
    ); //need fix
  }

  return (
    <div
      className={css({
        display: "flex",
        width: "100%",
        height: "100%",
      })}
    >
      <Suspense fallback={<h1>페이지 로딩...</h1>}>
        <Sidebar />
      </Suspense>
      <div
        className={css({
          flexGrow: 1,
          padding: "2em 1em",
        })}
      >
        {children}
      </div>
    </div>
  );
}
