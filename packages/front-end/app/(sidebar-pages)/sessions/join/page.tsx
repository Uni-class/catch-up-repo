"use client";

import { useCallback, useState } from "react";
import LineEdit from "@/components/LineEdit";
import { css } from "@/styled-system/css";
import Button from "@/components/Button/Button";
import { Label } from "@/components/Label";
import { useRouter } from "@/hook/useRouter";
import { routeTitle } from "@/const/routeTitle";
import JoinIcon from "@/public/icons/join.svg";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { apiClient } from "@/utils/axios";
import { Session } from "@/schema/backend.schema";
import { ModalContainer } from "./_components/ModalContainer";
import { SessionInfo } from "./_components/SessionInfo";

export default function Page() {
  const [sessionCode, setSessionCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const fetchSessionInfo = useCallback(() => {
    if (sessionCode.trim() === "") {
      toast("참여 코드를 입력해주세요.", {
        type: "error",
        position: "top-center",
      });
      return;
    }
    setIsOpen(true);
  }, [sessionCode]);

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
          alignItems: "flex-start",
          flexGrow: 1,
          justifyContent: "center",
          padding: "3rem 4.16rem",
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
          <Label htmlFor="session-code">참여 코드</Label>
          <LineEdit
            className={css({
              flexGrow: 1,
              height: "inherit",
            })}
            placeholder="참여 코드를 입력해 주세요."
            value={sessionCode}
            onChange={(event) => setSessionCode(event.target.value)}
            name="session-code"
            id="session-code"
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                fetchSessionInfo();
              }
            }}
          />
          <Button
            className={css({
              height: "inherit",
            })}
            onClick={() => {
              fetchSessionInfo();
            }}
            startIcon={<JoinIcon width={"1em"} height={"1em"} />}
          >
            접속하기
          </Button>
        </div>
      </div>
      {isOpen && (
        <ModalContainer onClose={()=>{setIsOpen(false)}}>
          <SessionInfo sessionCode={sessionCode}/>
        </ModalContainer>
      )}
    </div>
  );
}
