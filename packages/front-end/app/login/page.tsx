"use client";

import { css } from "@/styled-system/css";
import LoginButton from "./_components/LoginButton";
import { useAccountController } from "@/hook/useAccount";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const accountController = useAccountController();
  if (accountController.account) {
    accountController.goToDashboard();
  }

  return (
    <div
      className={css({
        display: "flex",
        width: "100%",
        height: "100%",
        bg: "primary",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color:"white",
      })}
    >
      <div
        className={css({
          width: "35rem",
          borderRadius: "4rem",
          padding: "5rem 2.5rem",
          backgroundColor: "#FFFFFF1A",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1em",
          })}
        >
          <Image
            src="/logo-horizontal-white.svg"
            width={173}
            height={33}
            alt="Logo"
            className={css({
              width: "10.8125rem",
              height: "2.0625rem",
            })}
          />
          <div
            className={css({
              color: "#ffffff",
              fontSize: "1.25em",
              fontWeight: "bold",
            })}
          >
            로그인 / 회원가입
          </div>
        </div>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            margin: "2rem 0",
          })}
        >
          <LoginButton providerEnum="GOOGLE" />
          <LoginButton providerEnum="NAVER" />
          <LoginButton providerEnum="KAKAO" />
        </div>
        <div className={css({width:"100%",color:"tertiary",display:"flex",justifyContent:"center"})}>
          <Link href="/">홈페이지로</Link>
        </div>
      </div>
    </div>
  );
}
