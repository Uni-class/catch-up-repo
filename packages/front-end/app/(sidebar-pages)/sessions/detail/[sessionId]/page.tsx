"use client";

import { apiClient } from "@/utils/axios";
import { useQueries } from "@tanstack/react-query";
import HostSession from "./_components/HostSession";
import { SessionResponseDto, User } from "@/schema/backend.schema";
import ParticipantSession from "./_components/ParticipantSession";
import { css } from "@/styled-system/css";
import { Heading } from "@/components/Text";
import Divider from "@/components/Divider";

interface PropType {
  params: { sessionId: string };
}

export default function Page({ params }: PropType) {
  const sessionId = Number(params.sessionId);
  const [
    { data: userRes, isLoading: isUserLoading },
    { data: sessionRes, isLoading: isSessionLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["user", "profile"],
        queryFn: async () => await apiClient.get<User>("/user/profile"),
        throwOnError: true,
      },
      {
        queryKey: ["session", sessionId],
        queryFn: async () =>
          await apiClient.get<SessionResponseDto>(`/session`, {
            params: { id: sessionId },
          }),
        throwOnError: true,
      },
    ],
  });
  if (isUserLoading || isSessionLoading) {
    return <h1>로딩...</h1>;
  }
  const sessionData = sessionRes?.data;
  const userData = userRes?.data;
  const isHost = userData?.userId === sessionData?.hostId;

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
        {isHost ? "세션 정보 & 수정" : "세션 정보"}
      </h1>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",

          flexGrow: 1,
        })}
      >
        {sessionData !== undefined &&
          userData !== undefined &&
          (isHost ? (
            <HostSession sessionData={sessionData} />
          ) : (
            <ParticipantSession sessionData={sessionData} />
          ))}
      </div>
    </div>
  );
}
