import { css } from "@/styled-system/css";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "./Profile";
import { Suspense } from "react";

const navData: { href: URL | string; text: string }[] = [
  { href: "/", text: "도움말" },
  { href: "/", text: "문의하기" },
];

const NavBar = () => {
  return (
    <div
      className={css({
        height: "4.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      })}
    >
      <Image
        src="/logo-horizontal-white.svg"
        width={173}
        height={33}
        alt="Logo"
      />
      <nav
        className={css({
          display: "flex",
          justifyContent: "space-between",
          gap: " 2rem",
        })}
      >
        {navData.map((e, i) => (
          <Link
            key={i}
            href={e.href}
            className={css({
              _hover: {
                color: "tertiary",
              },
              padding: "10px",
            })}
          >
            {e.text}
          </Link>
        ))}
      </nav>
      <Suspense>
        <Profile />
      </Suspense>
    </div>
  );
};

export default NavBar;
