"use client";

import { apiClient } from "@/util/axios";
import { useQueries } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import HostSession from "./_components/HostSession";
import { SessionResponseDto } from "@/schema/backend.schema";

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
        queryFn: async () => await apiClient.get<any>("/user/profile"),
        throwOnError: true,
      },
      {
        queryKey: ["session", sessionId],
        queryFn: async () =>
          await apiClient.get<SessionResponseDto>(`/session/${sessionId}`),
        throwOnError: true,
      },
    ],
  });
  if (isUserLoading || isSessionLoading) {
    return <h1>로딩...</h1>;
  }
  const sessionData = sessionRes?.data;
  console.log(sessionData);
  return (
    <>
      {sessionData !== undefined && <HostSession sessionData={sessionData} />}
    </>
  );
}
