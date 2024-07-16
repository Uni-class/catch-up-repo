"use client";

import { css } from "@/styled-system/css";
import LoginButton from "./_components/login-button";
import { PROJECT_NAME } from "@/Config";

export default function Page() {
  return (
      <div className={css({
        display: "flex",
        paddingBottom: "3em",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ff8f79",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      })}>
        <div className={css({
          display: "flex",
          padding: "2em 0",
          width: "25em",
          flexDirection: "column",
          alignItems: "center",
          gap: "1em",
        })}>
          <div className={css({
            color: "#ffffff",
            fontSize: "4.5em",
            fontWeight: "bold",
          })}>{PROJECT_NAME}</div>
          <div className={css({
            color: "#ffffff",
            fontSize: "1.5em",
            fontWeight: "bold",
          })}>로그인 / 회원가입
          </div>
          <hr className={css({
            margin: "1em 0",
            width: "100%",
            borderWidth: "0.15em",
            borderRadius: "1em",
            borderColor: "#ffffff"
          })}/>
        </div>
        <div className={css({
          display: "flex",
          width: "25em",
          flexDirection: "column",
          gap: "1em",
        })}>
          <LoginButton providerEnum="GOOGLE"/>
          <LoginButton providerEnum="NAVER"/>
          <LoginButton providerEnum="KAKAO"/>
        </div>
      </div>
  );
}
