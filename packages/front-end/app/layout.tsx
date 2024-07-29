"use client";

import './globals.css'
import Provider from "@/provider";
import { Inter } from "next/font/google";
import { css } from "@/styled-system/css";
import { useRouter } from "@/hook/useRouter";
import Sidebar from "@/app/_components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const showSidebar = (() => {
    for (const path of ["/dashboard", "/sessions", "/files", "/settings"]) {
      if (router.pathname === path || router.pathname.startsWith(`${path}/`)) {
        return true;
      }
    }
    return false;
  })();

  return (
    <html lang="ko">
      <body className={inter.className}>
      <Provider>
        <main className={css({display: "flex", height: "100vh"})}>
          {
            showSidebar
            ?
            <>
              <Sidebar/>
              <div className={css({
                flexGrow: 1,
                padding: "2em 1em",
              })}>
                {children}
              </div>
            </>
            :
            children
          }
        </main>
      </Provider>
      </body>
    </html>
  );
}