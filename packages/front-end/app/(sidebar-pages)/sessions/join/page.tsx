"use client";

import { useState } from "react";
import LineEdit from "@/components/LineEdit";
import { css } from "@/styled-system/css";
import Button from "@/components/Button";
import { Label } from "@/components/Label";
import { useRouter } from "@/hook/useRouter";
import { routeTitle } from "@/const/routeTitle";
import JoinIcon from "@/public/icons/join.svg";

export default function Page() {
  const [sessionCode, setSessionCode] = useState("");
  const [status, setStatus] = useState<{
    status: "notice" | "error";
    text: string;
  } | null>(null);
  const router = useRouter();
  return (
    <div
      className={css({
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
        })}
      >
        <div
          className={css({
            flex: 1,
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          })}
        >
          <Label htmlFor="session-code">세션 코드</Label>
          <LineEdit
            className={css({
              flexGrow: 1,
              height: "inherit",
            })}
            placeholder="세션 코드를 입력해 주세요."
            value={sessionCode}
            onChange={(event) => setSessionCode(event.target.value)}
            name="session-code"
            id="session-code"
          />
          <Button
            className={css({
              height: "inherit",
            })}
            disabled={sessionCode.trim() === ""}
            onClick={() => {
              if (sessionCode.trim() === "") {
                setStatus({
                  status: "error",
                  text: "세션 코드를 입력해주세요.",
                });
                return;
              }
              setStatus({ status: "notice", text: "세션을 로딩중입니다." });
              router.push(
                router.getURLString("/view", { code: `${sessionCode}` })
              );
            }}
            startIcon={<JoinIcon width={"1em"} height={"1em"}/>}
          >
            {"세션 접속"}
          </Button>
        </div>
      </div>
      <p
        className={css({
          height: "1rem",
          color: status?.status === "error" ? "red.500" : "green",
        })}
      >
        {status?.text}
      </p>
    </div>
  );
}
