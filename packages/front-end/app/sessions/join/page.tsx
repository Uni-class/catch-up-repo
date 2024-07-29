"use client";

import { useState } from "react";
import LineEdit from "@/components/LineEdit";
import { Heading, Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import Button from "@/components/Button";
import Divider from "@/components/Divider";

export default function Page() {
  const [sessionId, setSessionId] = useState("");
  return (
    <div className={css({
      height: "100%",
    })}>
      <Heading>세션 접속하기</Heading>
      <Divider/>
      <div className={css({
        margin: "10em 0",
      })}>
        <Paragraph variant="body3" className={css({
          marginBottom: "0.5em",
        })}>세션 아이디</Paragraph>
        <div className={css({
          display: "flex",
          gap: "0.5em",
        })}>
          <LineEdit className={css({
            width: "100%",
            height: "3em",
          })} placeholder="세션 아이디를 입력해 주세요." text={sessionId} onChange={(event) => setSessionId(event.target.value)}/>
          <Button disabled={sessionId === ""}>{"->"}</Button>
        </div>
      </div>
    </div>
  );
}
