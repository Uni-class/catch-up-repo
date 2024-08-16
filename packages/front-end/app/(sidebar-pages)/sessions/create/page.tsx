"use client";

import { Heading } from "@/components/Text";
import Divider from "@/components/Divider";
import SessionCreateForm from "./_components/SessionCreateForm";
import { css } from "@/styled-system/css";

export default function Page() {
  return (
    <div className={css({ display: "flex", flexDirection: "column",height:"100%" })}>
      <Heading>세션 생성</Heading>
      <Heading variant="sub5">세션을 만들기위한 정보 설정</Heading>
      <Divider />
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        })}
      >
        <SessionCreateForm />
      </div>
    </div>
  );
}
