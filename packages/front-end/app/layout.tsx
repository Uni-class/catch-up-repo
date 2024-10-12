import "./globals.css";
import Provider from "@/provider";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { css } from "@/styled-system/css";
import { pretendard } from "./_utils/localfont";

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
      <body className={`${inter.className}`}>
        <Provider>
          <div
            className={css({
              width: "100%",
              height: "100vh",
              overflow: "scroll",
            })}
          >
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
