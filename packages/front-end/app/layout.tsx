import './globals.css';
import Provider from "@/provider";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { css } from "@/styled-system/css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CatchUP",
  description: "CatchUP WebPage",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {

  return (
    <html lang="ko">
      <body className={inter.className}>
      <Provider>
        <div className={css({
          width: "100vw",
          height: "100vh",
        })}>
          {children}
        </div>
      </Provider>
      </body>
    </html>
  );
}