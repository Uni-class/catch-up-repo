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
  const [sessionId, setSessionId] = useState("");
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
              placeholder="세션 아이디를 입력해 주세요."
              value={sessionId}
              onChange={(event) => setSessionId(event.target.value)}
              name="session-code"
              id="session-code"
            />
            <Button
              className={css({
                height: "inherit",
              })}
              disabled={sessionId === ""}
              onClick={() => {
                router.push(`/view/${sessionId}`);
              }}
            >
              {"접속하기"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
