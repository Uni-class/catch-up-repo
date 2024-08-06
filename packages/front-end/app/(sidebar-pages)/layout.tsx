import { ReactNode, Suspense } from "react";
import { css } from "@/styled-system/css";
import Sidebar from "@/app/(sidebar-pages)/_components/Sidebar";
import RedirectToLogin from "./_components/RedirectToLogin";

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
      <RedirectToLogin />
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
