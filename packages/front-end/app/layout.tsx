import "./globals.css";
import Provider from "@/provider";
import { css } from "@/styled-system/css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Catch up",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Provider>
          <main
            className={css({
              width: "100vw",
              height: "100vh",
            })}
          >
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
