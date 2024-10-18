"use client";

import { ErrorBoundary } from "react-error-boundary";
import Divider from "@/components/Divider";
import { Heading } from "@/components/Text";
import UserProfileSettings from "./_components/UserProfileSettings";
import { css } from "@/styled-system/css";
import { routeTitle } from "@/const/routeTitle";
import { useRouter } from "@/hook/useRouter";

export default function Page() {
  const router = useRouter();
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
      })}
    >
      <h1
        className={css({
          fontSize: "1.5rem",
          fontWeight: "semibold",
          color: "black",
        })}
      >
        {routeTitle[router.pathname].name}
      </h1>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",

          flexGrow: 1,
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
