"use client";

import Link from "next/link";
import { css } from "@/styled-system/css";

export default function Page() {
  const tempNavBarItems = [
    {
      name: "로그인",
      href: "/login",
    },
    {
      name: "대시보드",
      href: "/dashboard",
    },
  ];

  return (
    <main>
      <div
        className={css({
          display: "flex",
          gap: "1em",
          backgroundColor: "orange.400",
        })}
      >
        {tempNavBarItems.map((item, index) => (
          <div
            key={index}
            className={css({
              padding: "0.5em 1em",
              backgroundColor: "gray.300",
              fontSize: "1.5em",
              cursor: "pointer",
              _hoverNotActive: {
                color: "#ffffff",
                backgroundColor: "gray.700",
              },
              _active: {
                color: "#ffffff",
                backgroundColor: "red.400",
              },
            })}
          >
            <Link href={item.href}>{item.name}</Link>
          </div>
        ))}
      </div>
      <div
        className={css({
          padding: "1em",
          fontSize: "2em",
        })}
      >
        메인 페이지
      </div>
    </main>
  );
}
