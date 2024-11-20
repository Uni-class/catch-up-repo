import "./globals.css";
import Provider from "@/provider";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { css, cx } from "@/styled-system/css";
import { pretendard } from "./_utils/localFont";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CatchUP",
  description: "CatchUP WebPage",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={css({ fontFamily: "Pretendard" })}>
        <Provider>
          <div
            className={css({
              width: "100%",
              height: "100vh",
            })}
          >
            {children}
          </div>
          <div
            id="hidden-download-container"
            className={css({
              visibility: "hidden",
              position: "absolute",
              zIndex: -1000,
              top: 0,
              left: 0,
              width: "5000px",
              height: "5000px",
              overflow: "hidden",
            })}
          ></div>
        </Provider>
      </body>
    </html>
  );
}
