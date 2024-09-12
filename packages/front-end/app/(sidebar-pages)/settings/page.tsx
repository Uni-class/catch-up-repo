"use client";

import { ErrorBoundary } from "react-error-boundary";
import Divider from "@/components/Divider";
import { Heading } from "@/components/Text";
import UserProfileSettings from "./_components/UserProfileSettings";
import { css } from "@/styled-system/css";

export default function Page() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
      })}
    >
      <Heading>설정</Heading>
      <Divider />
      <div
        className={css({
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <ErrorBoundary
          fallback={<h1>예기치 못한 오류가 발생하였습니다. [임시 컴포넌트]</h1>}
        >
          <UserProfileSettings />
        </ErrorBoundary>
      </div>
    </div>
  );
}
