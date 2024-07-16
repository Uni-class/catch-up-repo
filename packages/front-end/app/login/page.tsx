"use client";

import { css } from "@/styled-system/css";
import LoginButton from "./_components/login-button";

export default function Page() {
  return (
    <main>
      <section className={css({
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem 2rem",
        width: "500px",
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        gap: "1rem",
      })}>
        <h1>캐치업</h1>
        <h2>로그인 & 시작하기</h2>
        <div className={css({height: "1px", width:"100%",bg:"gray.200"})}/>
        <LoginButton providerEnum="GOOGLE" />
        <LoginButton providerEnum="NAVER" />
        <LoginButton providerEnum="KAKAO" />
      </section>
    </main>
  );
}
