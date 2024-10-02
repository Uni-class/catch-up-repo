"use client";

import { useState } from "react";
import LineEdit from "@/components/LineEdit";
import { Heading, Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import { Label } from "@/components/Label";
import { useRouter } from "@/hook/useRouter";

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
      <Heading>세션 접속하기</Heading>
      <Divider />
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
            flexDirection: "column",
            gap: "1rem",
          })}
        >
          <Label htmlFor="session-code">세션 코드</Label>
          <div
            className={css({
              display: "flex",
              gap: "0.5rem",
            })}
          >
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
            >
              {"접속하기"}
            </Button>
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
      </div>
    </div>
  );
}
